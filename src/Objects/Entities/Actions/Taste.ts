
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

//assume only peewee can look
export class Taste extends Action {
    /*
    KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast. 

    const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
    const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
    const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
    //
    const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];

    const listen_euphamemism = ["LISTEN", "HEAR"];
    //oh god why are you TASTING anything here.
    const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
    //should smell either faintly or overpoweringly
    const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
    //should feel weird and fake
    const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
    const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];

    past me is a treasure
    */


    recognizedCommands: string[] = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];

    sense = TASTE;

    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian)=>{
        const north = current_room.getNorth();
        const south = current_room.getSouth();
        const east = current_room.getEast();
        let thingsHeard = `the taste of ${current_room.getRandomThemeConcept(this.sense)}.`;
        if (north) {
            thingsHeard = `${thingsHeard} <p>When he licks the doorknob of the NORTH DOOR he tastes ${north.getRandomThemeConcept(this.sense)}.</p>`;
        }

        if (south) {
            thingsHeard = `${thingsHeard} <p>When he licks the doorknob of the SOUTH DOOR he tastes ${south.getRandomThemeConcept(this.sense)}.</p>`;
        }

        if (east) {
            thingsHeard = `${thingsHeard} <p>When he licks the doorknob of the EAST DOOR he tastes ${east.getRandomThemeConcept(this.sense)}.</p>`;
        }

        return `${subject.processedName()} starts licking things at random. He has so many regrets. He will never forget the flavor of ${thingsHeard}`;
    }

    withTargets = (beat: AiBeat,current_room: Room, subject: Quotidian, targets: PhysicalObject[])=>{
        let thingsHeard:string[] = [];
        for(let target of targets){
            thingsHeard.push(target.getRandomThemeConcept(this.sense));
        }

        return `${subject.processedName()} slowly licks ${turnArrayIntoHumanSentence(targets.map((e)=>e.processedName()))}. He tastes ${turnArrayIntoHumanSentence(thingsHeard)}. Why would you have him do that!?`;

    }


    applyAction = (beat: AiBeat)=>{
        const current_room = beat.owner?.room;
        if(!current_room){
            return "";
        }
        const subject = beat.owner;
        if(!subject){
            return "";
        }

    
        const targets = beat.targets;
        if(targets.length ===0){
            return this.noTarget(beat, current_room, subject);
        }else{
            return this.withTargets(beat, current_room, subject, targets);
        }
    }

}