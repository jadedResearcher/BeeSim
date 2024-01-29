
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";


export class ChangeStabilityLevelByAmount extends Action {


    amount: number; //can pass it a negative too

    recognizedCommands: string[] = [];
    constructor(amount: number) {
        super();
        this.amount = amount;
    }






    applyAction = (beat: AiBeat) => {
        const current_room = beat.owner?.room;
        if (!current_room) {
            return "";
        }
        let ret = "";
        for (let target of beat.targets) {
            if (target instanceof Quotidian) {
                target.stabilityLevel += this.amount;
                ret +=  `${target.processedName()} stability level changes by ${target.stabilityLevel} to ${this.amount}. `;

            }

        }
        return ret;
    }

}