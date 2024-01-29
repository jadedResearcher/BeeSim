import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

//used for things like "if killer does not have an egg, they will kill targets (not just targeting self)""
export class IHaveObjectWithName extends TargetFilter {
    words: string[];
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(words: string[], options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        super(options);
        this.words = words;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.words.length === 1) {
            return `they are holding something ${this.invert?"not":""}  named ${this.words[0]}`;
        }
        return `they are holding something ${this.invert?"not":""}  named any of these words ${turnArrayIntoHumanSentence(this.words)}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if(!owner.owner){
            return null;
        }
        //if its empty, then we're just checking if you have ANY object
        if(this.words.length === 0 && owner.owner.inventory.length > 0){
            targetLocked = true;
        }
        for (let word of this.words) {
            for (let item of owner.owner.inventory){
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