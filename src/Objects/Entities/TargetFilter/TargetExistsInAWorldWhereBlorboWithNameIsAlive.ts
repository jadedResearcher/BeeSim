import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

export class TargetExistsInAWorldWhereBlorboNamedXIsAlive extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    name: string;

    constructor(name: string, options: TargetingOptionType = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.name = name;
    }



    toString = () => {

        return `they realize ${this.name} is ${this.invert ? "not" : ""} alive`;
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
            if (!blorbo.dead) {
                targetLocked = true;
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