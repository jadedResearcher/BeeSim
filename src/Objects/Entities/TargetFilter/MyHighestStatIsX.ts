import { distanceWithinRadius } from "../../../Utils/misc";
import { PhysicalObject } from "../../PhysicalObject";
import { Quotidian } from "../Blorbos/Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export class MyHighestStatIsX extends TargetFilter {
    stat: string;
    //this is not a place of honor

    constructor(stat: string, options: TargetingOptionType = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.stat = stat;
    }

    toString = () => {
        //format this like it might start with either because or and
        return `${TARGETSTRING}'s highest stat is ${this.invert ? "not" : ""}   ${this.stat}}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if (!owner.owner) {
            console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
            return null;
        }
        if (owner instanceof Quotidian) {
            if (owner.highestStat() === this.stat) {
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