import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Theme } from "../../Theme";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType } from "./baseFilter";

//used for things like "if target is near a plant";
export class IHaveObjectWithTheme extends TargetFilter {
    themes: Theme[];
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(themes: Theme[],options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        super(options);
        this.themes = themes;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.themes.length === 1) {
            return `they are holding something ${this.invert?"not":""}  associated with ${this.themes[0].key}`;
        }
        return `they are holding an object ${this.invert?"not":""}  associated with any of these themes ${turnArrayIntoHumanSentence(this.themes.map((i)=>i.key))}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if(!owner.owner){
            return null;
        }
        for (let theme of this.themes) {
            for (let item of owner.owner.inventory){
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