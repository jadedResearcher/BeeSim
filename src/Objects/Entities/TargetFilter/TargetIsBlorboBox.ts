import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Quotidian } from "../Blorbos/Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter } from "./baseFilter";

export class TargetIsBlorboOrBox extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY



    toString = () => {

        return `they see something that is ${this.invert?"not":""}  a person`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if (target.processedName().toUpperCase().includes("BOX")) {
            targetLocked = true;
        }else if (target instanceof Quotidian){
            targetLocked = true;
        }

        if (targetLocked) {
            return this.invert? null:  target;
        } else {
            return this.invert? target:  null;
        }
    }


}