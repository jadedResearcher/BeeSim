import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

export class TargetNameIncludesAnyOfTheseWords extends TargetFilter {
    words: string[];
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(words: string[], options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        super(options);
        this.words = words;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.words.length === 1) {
            return `they see something ${this.invert?"not":""} named ${this.words[0]}`;
        }
        return `they see something named any of these words ${turnArrayIntoHumanSentence(this.words)}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        for (let word of this.words) {
            if (target.processedName().toUpperCase().includes(word.toUpperCase())) {
                targetLocked = true;
            }
            for(let state of target.states){
                //console.log("JR NOTE: in state", state, "checking word", word)
                if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                    targetLocked = true;
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