import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Theme } from "../../Theme";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

//used for things like "if target is near a plant";
export class TargetNearObjectWithTheme extends TargetFilter {
    themes: Theme[];
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(themes: Theme[], options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        super(options);
        this.themes = themes;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.themes.length === 1) {
            return `they see something ${this.invert?"not":""}  near something associated with ${this.themes[0].key}`;
        }
        return `they see something ${this.invert?"not":""}  near an object associated with any of these themes ${turnArrayIntoHumanSentence(this.themes.map((i)=>i.key))}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        for (let theme of this.themes) {
            for (let item of target.room.items){
                if (item.themes.includes(theme)) {
                    targetLocked = true;
                }
            }

            for (let item of target.room.blorbos){
                if (item.themes.includes(theme)) {
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