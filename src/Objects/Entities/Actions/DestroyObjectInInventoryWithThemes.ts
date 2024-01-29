
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian } from "../Blorbos/Quotidian";
import { Theme } from "../../Theme";
import { PhysicalObject } from "../../PhysicalObject";
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";


export class DestroyInventoryObjectWithThemes extends Action { //lawsuit

    

    recognizedCommands: string[] = []
    themes: Theme[];

    constructor(themes:Theme[]){
        super();
        this.themes = themes;
    }

    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }

        const targets = beat.targets;
        const target = targets[0];
        if (target.inventory.length > 0) {
            let item = target.inventory[0];
            let chosen = true;
            for(let i of target.inventory){
                chosen  = true;
                for(let theme of this.themes){
                    if(!item.themes.includes(theme)){
                        chosen = false;
                    }
                }
                if(chosen){
                    if (target instanceof Quotidian) {
                        target.emitSass("!")
                    }
                    target.destroyObject(item);
                    return `${target.processedName()} loses the  ${item.name}.`;
                }
            }
            return `${target.processedName()} has nothing associated with ${turnArrayIntoHumanSentence(this.themes.map((i)=>i.key))} to lose.`;


           

        } else {
            return `${target.processedName()} has nothing  to lose.`;//bad ass

        }
    }



}