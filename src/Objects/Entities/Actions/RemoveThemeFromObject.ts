
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { MoveToSpecificPhysicalObject } from "../../MovementAlgs/MoveToSpecificPhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { Theme } from "../../Theme";
import { removeItemOnce } from "../../../Utils/ArrayUtils";

export class RemoveThemeFromObject extends Action{ //lawsuit
    theme: Theme; //technically storing the key would be a smaller footprint but then i'd have to wait till runtime to find out if i typoed a key and boy do i not want to do that rn
    
    recognizedCommands:string[] =[]

    constructor(theme:Theme){
        super();
        this.theme = theme;
    }

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const target = beat.targets;
        if(target.length < 1){
            return `${subject.processedName()} can't see anything to modify with ${this.theme.key}...`;
        }
        removeItemOnce(subject.themes, this.theme);
        return `${subject.processedName()} modifies the  ${target[0].processedName()} to be less ${this.theme.key}.`;
    }



}