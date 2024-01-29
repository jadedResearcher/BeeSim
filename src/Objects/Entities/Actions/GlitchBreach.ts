
import { removeItemOnce, turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian } from "../Blorbos/Quotidian";

//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
export class GlitchBreach extends Action {

    hidden = true;


    recognizedCommands: string[] = ["BREACH","ENRAGE","DESTABILIZE"];


    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian) => {
        return `${subject.processedName()} doesn't see anything to breach.`;
    }

    withTargets = (beat: AiBeat, current_room: Room, subject: Quotidian, targets: PhysicalObject[]) => {
        let killed = false;
        const previousNames = turnArrayIntoHumanSentence(targets.map((e) => e.processedName()));
        for (let target of targets) {
            target.incrementState();
            killed = true;
        }
        if (!killed) {
            return this.noTarget(beat, current_room, subject);
        }
        return `A glitch shudders over the ${previousNames}, turning them into  ${turnArrayIntoHumanSentence(targets.map((e) => e.processedName()))}.`;

    }


    applyAction = (beat: AiBeat) => {
        const current_room = beat.owner?.room;
        if (!current_room) {
            return "";
        }
        const subject = beat.owner;
        if (!subject) {
            return "";
        }


        let targets = beat.targets;
        if (targets.length === 0) {
            targets = [...current_room.blorbos];
            removeItemOnce(targets, subject); //unless you're specifically
            return this.withTargets(beat, current_room, subject, targets); //boy sure hope you don't accidentally type kill as part of another word with no targets :) :) :)
        } else {
            return this.withTargets(beat, current_room, subject, targets);
        }
    }

}