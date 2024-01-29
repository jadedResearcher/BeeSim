
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian } from "../Blorbos/Quotidian";
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";


export class CheckInventory extends Action { //lawsuit


    recognizedCommands: string[] = ["INVENTORY", "ITEMS", "POCKETS","POUCH","BAG"]

    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }

        const target = beat.targets;
        if (target.length < 1) {
            return `${subject.processedName()} has the following in their inventory: ${turnArrayIntoHumanSentence(subject.inventory.map((item)=>item.processedName()))}`;
        }
        return `${target[0].processedName()} has the following in their inventory: ${turnArrayIntoHumanSentence(target[0].inventory.map((item)=>item.processedName()))}`;
   
    }



}