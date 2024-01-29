
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { PhysicalObject } from "../../PhysicalObject";
import { all_themes, Theme } from "../../Theme";
import { FLOORBACKGROUND } from "../../ThemeStorage";
import { TARGETSTRING } from "../TargetFilter/baseFilter";

export class SpawnObjectFromThemeInInventory extends Action { //lawsuit

    recognizedCommands: string[] = []
    theme_key: string;
    name?: string;

    constructor(theme_key: string, name: string) {
        super();
        this.theme_key = theme_key;
        this.name = name;
    }


    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }
        const theme = all_themes[this.theme_key];

        // const image: any = await addImageProcess(`images/Walkabout/Objects/UnderFloorObjects/${item.src}`) as HTMLImageElement;
 
        for(let target of beat.targets){
            const name = target.spawnRandomItemInInventory([all_themes[this.theme_key]], this.name? beat.processTags(this.name):undefined);
            beat.itemName = name;
        }

 


        return `${subject.processedName()} finds a thing.`;
    }



}