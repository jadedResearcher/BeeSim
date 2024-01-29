import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Quotidian } from "../Blorbos/Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export class TargetIsRomanticToMe extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    toString = () => {

        return `${TARGETSTRING} is  ${this.invert ? "not" : ""} important to ${SUBJECTSTRING}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        
        if (owner.owner && (target instanceof Quotidian)) {
            const relationship = owner.owner.getRelationshipWith(target);
            if(relationship && relationship.romantic){
                targetLocked = true;
            }
        }

        if (targetLocked) {
            return this.invert ? null : target;
        } else {
            return this.invert ? target : null;
        }
    }


}