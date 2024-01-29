import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

//used for things like "if target is killer && target is near egg";
export class TargetNearObjectWithName extends TargetFilter {
    words: string[];
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(words: string[], options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        super(options);
        this.words = words;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.words.length === 1) {
            return `they see something ${this.invert?"not":""}  near something named ${this.words[0]}`;
        }
        return `they see something ${this.invert?"not":""}  near an object named any of these words ${turnArrayIntoHumanSentence(this.words)}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        for (let word of this.words) {
            for (let item of target.room.items){
                if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                    targetLocked = true;
                }
                for(let state of item.states){
                    if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                }
            }

            for (let item of target.room.blorbos){
                if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                    targetLocked = true;
                }
                for(let state of item.states){
                    if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                }
            }
        }
        if (targetLocked) {
            return this.invert? null:  target;
        } else {
            return this.invert? target:  null;
        }
    }


}