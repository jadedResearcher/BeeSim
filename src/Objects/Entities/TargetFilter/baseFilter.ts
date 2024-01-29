import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export const TARGETSTRING = "[INSERTTARGETSHERE]"
export const SUBJECTSTRING = "[INSERTSUBJECTHERE]"

export type TargetingOptionType = {
    invert?: boolean,
    singleTarget?: boolean,
    kMode?: boolean
}

export class TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    invert = false;
    kMode = false; //target self
    singleTarget = false;
    constructor(options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        this.invert = options.invert? options.invert : false;
        this.kMode = options.kMode? options.kMode : false;
        this.singleTarget = options.singleTarget ? options.singleTarget : false;
    }

    toString = () => {
        //format this like it might start with either because or and
        return "they could";
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        if (this.invert) {
            return null;
        }
        return target;
    }

    filter = (owner: AiBeat, objects: PhysicalObject[]) => {
        if (!owner.owner) {
            console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
            return [];
        }



        if (this.kMode) {
            const survivor = this.applyFilterToSingleTarget(owner, owner.owner);
            if (survivor) {
                return [survivor];
            }
        } else {
            let targets: PhysicalObject[] = [];
            for (let target of objects) {
                const survivor = this.applyFilterToSingleTarget(owner, target);
                if (survivor) {
                    targets.push(survivor);
                    if (this.singleTarget) { //if i only want a single target, i have it
                        break;
                    }
                }
            }
            return targets;
        }
        return [];
    }

}

