
import { removeItemOnce, turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian } from "../Blorbos/Quotidian";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";

//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
export class GlitchAnnoy extends Action {

    hidden = true;


    recognizedCommands: string[] = ["ANNOY","IRRITATE","PESTER"];


    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian) => {
        return `${subject.processedName()} doesn't see anyone to annoy.`;
    }

    withTargets = (beat: AiBeat, current_room: Room, subject: Quotidian, targets: PhysicalObject[]) => {
        let killed = false;
        for (let target of targets) {
            if(target instanceof Quotidian){
                target.likeBlorboLess(subject, 13);
                subject.likeBlorboLess(target, 13);

            }
            killed = true;
        }
        if (!killed) {
            return this.noTarget(beat, current_room, subject);
        }
        return `${subject.name} spends just way too much time and effort annoying ${turnArrayIntoHumanSentence(targets.map((item=>item.name)))}. `;

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