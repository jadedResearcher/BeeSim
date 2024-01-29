
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { Quotidian, stats_values_mapping } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { ADJ, PERSON } from "../../ThemeStorage";

//assume only peewee can look
export class Look extends Action {
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


    recognizedCommands: string[] = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE", "OGLE"];





    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian) => {
        let thingsSeen = "Peewee glances around and sees";
        if (current_room.children.length === 1) {
            thingsSeen = `${thingsSeen} a door.`;

        } else {
            thingsSeen = `${thingsSeen} ${current_room.children.length} doors.`;
        }

        const north = current_room.getNorth();
        const south = current_room.getSouth();
        const east = current_room.getEast();
        if (north) {
            thingsSeen = `${thingsSeen} <p>On the NORTH door, he sees a sign labeled ${north.name}.</p>`;
        }

        if (current_room.totemObject){
            return  `${thingsSeen}  <p style="color: #a10000;font-family: zai_i_love_covid_19">${current_room.totemObject.lore}</p>`
        }

        if (south) {
            thingsSeen = `${thingsSeen} <p>On the SOUTH door, he sees a sign labeled ${south.name}.</p>`;
        }

        if (east) {
            thingsSeen = `${thingsSeen} <p>On the EAST door, he sees a sign labeled ${east.name}.</p>`;
        }

        if (current_room.items.length > 0) {
            thingsSeen = `${thingsSeen} <p>He also sees ${current_room.items.length} item(s). Looking closer, they are ${turnArrayIntoHumanSentence(current_room.items.map((e) => e.processedName()))}.</p>`;
        }

        if (current_room.blorbos.length > 0) {
            thingsSeen = `${thingsSeen} <p>He also sees ${current_room.blorbos.length} blorbos(s). Looking closer, they are ${turnArrayIntoHumanSentence(current_room.blorbos.map((e) => e.processedName()))}.</p>`;
        }
        return thingsSeen;
    }

    withTargets = (beat: AiBeat, current_room: Room, subject: Quotidian, targets: PhysicalObject[]) => {
        let thingsHeard: string[] = [];
        for (let target of targets) {
            thingsHeard.push(`${target.getRandomThemeConcept(ADJ)} ${target.getRandomThemeConcept(PERSON)}`);
        }

        const lookcloser = current_room.rand.pickFrom(targets);
        const inventory = lookcloser.inventory.length > 0? turnArrayIntoHumanSentence( lookcloser.inventory.map((i:PhysicalObject)=>i.processedName())) :"nothing";
        let retSoFar =  `${subject.processedName()} looks at ${turnArrayIntoHumanSentence(targets.map((e) => e.processedName()))}. He sees an aura of ${turnArrayIntoHumanSentence(thingsHeard)}.<br><br> He filters ${lookcloser instanceof Quotidian? "":" the"} ${lookcloser.processedName()} through their cybernetic, wasted eyes.<br><div style="border: 1px solid red; padding: 10px; font-family: Courier New;"> ${lookcloser.flavorText} <Br><br>They have ${inventory} in their inventory. <br><br>Their movement algorithm is ${lookcloser.movement_alg? lookcloser.movement_alg.constructor.name :"NONE"}`;
        if(lookcloser.relationshipMap && lookcloser.relationshipMap.keys().length !== 0){
            retSoFar += "<br><br>They have the following opinions about the other blorbos: <ul style='padding:10px; border:1px solid pink; width: 500px;'>";
            for(let relationshipPair of lookcloser.relationshipMap){
                const relationship = relationshipPair[1];
                retSoFar += `<li style="margin-bottom: 10px;"><u>${relationship.title}</u>: Strength: ${Math.round(relationship.amount)},   ${relationship.toString()}</li>`;

            }
            retSoFar += "</ul>"
        }
        if(lookcloser instanceof Quotidian){
            retSoFar += `<br>${lookcloser.name}'s stability level is: ${lookcloser.stabilityLevel}`
            retSoFar += `<br>Their themes are : ${(lookcloser.themes).map((i)=>i.key).join(",")}`

            retSoFar += `<br>Their AI is is: ${(lookcloser.beats.join(","))}`
            retSoFar += `<br>Their stats are: <ul> 
            <li>Fortitude: ${(stats_values_mapping(lookcloser.fortitude))}</li>
            <li>Prudence: ${(stats_values_mapping(lookcloser.prudence))}</li>
            <li>Temperence: ${(stats_values_mapping(lookcloser.temperance))}</li>
            <li>Judgement: ${(stats_values_mapping(lookcloser.judgement))}</li>
            </ul>`

        }
        retSoFar += "</div>"
        return retSoFar;
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