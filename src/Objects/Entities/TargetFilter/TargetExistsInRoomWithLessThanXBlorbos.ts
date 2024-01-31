import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

export class TargetExistsInRoomWithLessThanXBlorbos extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    peers:number;
    constructor(peers: number, options: TargetingOptionType = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.peers = peers;
    }



    toString = () => {

        return `they realize target is ${this.invert ? "not" : ""} near ${this.peers} blorbos`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if (!owner.owner) {
            return this.invert ? target : null;
        }
        if (owner.owner.room.blorbos.length < this.peers) {
            targetLocked = false;
        } else {
            targetLocked = true;
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