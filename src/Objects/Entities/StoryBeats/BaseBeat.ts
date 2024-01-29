import { removeItemOnce, turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../../RoomEngine/Maze";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { SMELL } from "../../ThemeStorage";
import { Action } from "../Actions/BaseAction";
import { heProunon,himPronoun, hisProunon, NB, Quotidian } from "../Blorbos/Quotidian";
import { SUBJECTSTRING, TargetFilter, TARGETSTRING } from "../TargetFilter/baseFilter";

export const ITEMSTRING = "ITEMSTRING";
export const BONUSSTRING = "BONUSSTRING";
export const SUBJECT_HIS_SCRIPT = "[SUBJECTHISSCRIPT]"
export const SUBJECT_HIM_SCRIPT = "[SUBJECTHIMSCRIPT]"
export const SUBJECT_HE_SCRIPT = "[SUBJECTHESCRIPT]"

export const TARGET_HIS_SCRIPT = "[TARGETHISSCRIPT]"
export const TARGET_HIM_SCRIPT = "[TARGETHIMSCRIPT]"
export const TARGET_HE_SCRIPT = "[TARGETHESCRIPT]"
export const ROOM_SMELL_SCRIPT = "[ROOM_SMELL_SCRIPT]"
export const TARGET_SMELL_SCRIPT = "[TARGET_SMELL_SCRIPT]"


export class AiBeat {
    permanent: boolean; //is this a one and done or should it be forever. 
    filters: TargetFilter[];
    canFastFollow = false; //are you allowed to go less than a second after some other beat? (mostly for things like killing)
    actions: Action[];
    debugFunction?: Function;
    command: string;
    //used for things like neville philosophizing
    bonusString = "";
    //yes we can manually create some text from cause and effect but it comes off robotic. good for debugging, not for the final product
    flavorText: string[];
    itemName = "ERROR: NO ITEM FOUND";
    timeBetweenBeats: number;
    targets: PhysicalObject[] = [];
    owner: Quotidian | undefined;
    timeOfLastBeat: undefined | number;


    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.


    //some beats longer than others
    constructor(command: string, flavorText: string[], triggers: TargetFilter[], actions: Action[], permanent = false, timeBetweenBeats = 10000, canFastFollow = false, debugFunction?: Function) {
        this.filters = triggers;
        this.canFastFollow = canFastFollow;
        this.command = command;
        this.actions = actions;
        this.debugFunction = debugFunction;
        this.flavorText = flavorText;
        this.permanent = permanent;
        this.timeBetweenBeats = timeBetweenBeats;
    }

    itsBeenAwhileSinceLastBeat = () => {
        if (this.timeOfLastBeat) {
            return new Date().getTime() - this.timeOfLastBeat > this.timeBetweenBeats;
        }
        return true; //if its the first time we're going, just DO something, don't wait thirty seconds or whatever
    }

    clone = (owner: Quotidian) => {
        //doesn't clone targets, those are set per beat when resolved..
        const beat = new AiBeat(this.command, this.flavorText, this.filters, this.actions, this.permanent, this.timeBetweenBeats, this.canFastFollow, this.debugFunction);
        beat.owner = owner;

        return beat;
    }

    addStorybeatToScreen = (maze: Maze, command: string, response: string) => {
        const beat = new StoryBeat(command, response)
        maze.addStorybeat(beat);
        return beat;
    }

    processTags = (text: string) => {
        let ret = text;
        if (this.targets && this.targets.length > 0) {
            ret = text.replaceAll(TARGETSTRING, turnArrayIntoHumanSentence(this.targets.map((t) => t.name)));
        }
        ret = ret.replaceAll(ITEMSTRING, this.itemName);
        if (this.owner) {
            ret = ret.replaceAll(SUBJECTSTRING, this.owner.processedName());
        }

        ret = ret.replaceAll(BONUSSTRING, this.bonusString);

        if (this.owner) {
            ret = ret.replaceAll(SUBJECT_HE_SCRIPT, heProunon(this.owner.gender));
            ret = ret.replaceAll(SUBJECT_HIM_SCRIPT, himPronoun(this.owner.gender));
            ret = ret.replaceAll(SUBJECT_HIS_SCRIPT, hisProunon(this.owner.gender));
        }
        if (this.targets) {
            if (this.targets.length === 1 && this.targets[0] instanceof Quotidian) {
                ret = ret.replaceAll(TARGET_HE_SCRIPT, heProunon(this.targets[0].gender));
                ret = ret.replaceAll(TARGET_HIM_SCRIPT, himPronoun(this.targets[0].gender));
                ret = ret.replaceAll(TARGET_HIM_SCRIPT, hisProunon(this.targets[0].gender));
            } else {
                ret = ret.replaceAll(TARGET_HE_SCRIPT, heProunon(NB));
                ret = ret.replaceAll(TARGET_HIM_SCRIPT, himPronoun(NB));
                ret = ret.replaceAll(TARGET_HIM_SCRIPT, hisProunon(NB));
            }

            const room_smell = this.targets[0].room.getRandomThemeConcept(SMELL);
            ret = ret.replaceAll(ROOM_SMELL_SCRIPT, room_smell);

            const target_smell = this.targets[0].getRandomThemeConcept(SMELL);
            ret = ret.replaceAll(TARGET_SMELL_SCRIPT, target_smell);

        }


        return ret;
    }

    toString = () => {
        return this.command
    }

    performActions = (current_room: Room) => {
        if (!this.owner) {
            return console.error("ALWAYS clone beats, don't use them from list directly", this);
        }
        this.timeOfLastBeat = new Date().getTime();

        let causes = [];
        let effects = [];
        let importantEffects = [];
        for (let t of this.filters) {
            causes.push(this.processTags(t.toString()));
        }

        for (let a of this.actions) {
            let e = (a.applyAction(this));
            if (a.importantReturn) {
                importantEffects.push(e); //some actions are conditional and i want them to tell me how they went. 
            }
            effects.push(e); //most actions are just for debugging
        }

        this.addStorybeatToScreen(current_room.maze, this.processTags(this.command), this.processTags(this.owner.rand.pickFrom(this.flavorText) + `${importantEffects.join(" ")}`));
        if (current_room.maze.debug) {
            this.addStorybeatToScreen(current_room.maze, "AI: DEBUG", `DEBUG: Because ${turnArrayIntoHumanSentence(causes)}... ${(effects.join("<br>"))}`);
        }
    }

    performFriendlyActions = (current_room: Room) => {
        if (!this.owner) {
            return console.error("ALWAYS clone beats, don't use them from list directly", this);
        }
        this.timeOfLastBeat = new Date().getTime();

        let causes = [];
        let effects = [];
        for (let t of this.filters) {
            causes.push(this.processTags(t.toString()));
        }

        for (let a of this.actions) {
            effects.push(a.applyAction(this));
        }
        //actually FRIEND will handle taking care of story beats on its own.
    }




    //ALL triggers must be true for this to be true.
    triggered = (current_room: Room, allow_self = false) => {
        if (this.debugFunction) {
            this.debugFunction(this);
        }
        this.itemName = "ERROR: NO ITEM FOUND"; //reset
        if (!this.owner) {
            return console.error("ALWAYS clone beats, don't use them from list directly", this);
        }

        if (!this.itsBeenAwhileSinceLastBeat()) {
            return false;
        }
        //start out targeting EVERYTHING in this room
        this.targets = [...current_room.blorbos, ...current_room.items];
        if (!allow_self) {//only for peewee commands
            removeItemOnce(this.targets, this.owner); //unless you're specifically
        }
        for (let t of this.filters) {
            this.targets = t.filter(this, this.targets)
            if (this.targets.length === 0) {
                return false;
            }
        }

        return true;
    }

}