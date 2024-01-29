
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { ADJ, PERSON, PHILOSOPHY } from "../../ThemeStorage";

//assume only peewee can look
export class Think extends Action {



    recognizedCommands: string[] = ["THINK","PONDER","CONTEMPLATE","PHILOSOPHIZE","BULLSHIT"];



    concept = PHILOSOPHY;

    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian) => {
        let thingsSeen = `Peewee thinks: ${current_room.getRandomThemeConcept(this.concept)}. `;


        const north = current_room.getNorth();
        const south = current_room.getSouth();
        const east = current_room.getEast();
        if (north) {
            thingsSeen = `${thingsSeen} <p>Looking at the NORTH door, he thinks: ${north.getRandomThemeConcept(this.concept)}.</p>`;
        }

        if (south) {
            thingsSeen = `${thingsSeen} <p>Looking at the SOUTH door, he thinks:  ${south.getRandomThemeConcept(this.concept)}.</p>`;
        }

        if (east) {
            thingsSeen = `${thingsSeen} <p>Looking at the EAST door, he thinks: ${east.getRandomThemeConcept(this.concept)}.</p>`;
        }

        return thingsSeen;
    }

    withTargets = (beat: AiBeat, current_room: Room, subject: Quotidian, targets: PhysicalObject[]) => {
        let thingsHeard: string[] = [];
        for (let target of targets) {
            thingsHeard.push( target.getRandomThemeConcept(this.concept));
        }

        return `${subject.processedName()} looks to ${turnArrayIntoHumanSentence(targets.map((e) => e.processedName()))} for inspiration. He thinks: ${turnArrayIntoHumanSentence(thingsHeard)}`;

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


        const targets = beat.targets;
        if (targets.length === 0) {
            return this.noTarget(beat, current_room, subject);
        } else {
            return this.withTargets(beat, current_room, subject, targets);
        }
    }



}