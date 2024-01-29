import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export class TargetIsTheKillerOfBlorboNamed extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    name: string;

    constructor(name: string, options: TargetingOptionType = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.name = name;
    }



    toString = () => {

        return `they realize ${TARGETSTRING} is ${this.invert ? "not" : ""} the killer of ${this.name}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if (!owner.owner) {
            return this.invert ? target : null;
        }
        const blorbo = owner.owner.room.maze.findBlorboNamed(this.name);
        if (!blorbo) {
            targetLocked = false;
        } else {
            if (blorbo.dead) {
                const killersName = blorbo.killerName;
                if (!killersName) { //even if you died, if you have no killer, they couldn't have been this guy
                    targetLocked = false;
                } else {
                    if (target.processedName().toUpperCase().includes(killersName.toUpperCase())) {
                        targetLocked = true;
                    }
                    if (!targetLocked) {
                        for (let state of blorbo.states) {
                            if (state.processedName().toUpperCase().includes(killersName.toUpperCase())) {
                                targetLocked = true;
                            }
                        }
                    }
                }
            }
        }


        if (this.invert) {
        }
        if (targetLocked) {
            return this.invert ? null : target;
        } else {
            return this.invert ? target : null;
        }
    }


}