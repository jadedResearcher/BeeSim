
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";

import { all_themes, Theme } from "../../Theme";

export class AddThemeToRoom extends Action{ //lawsuit
    theme_key: string; //can't store themes directly, won't let me clone a beat, need to do for themed beats
    recognizedCommands:string[] =[]

    constructor(theme_key:string){
        super();
        this.theme_key = theme_key;
    }

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const target = beat.targets;
        if(target.length < 1){
            return `${subject.processedName()} can't see anything to modify with ${this.theme_key}...`;
        }
        subject.room.themes.push(all_themes[this.theme_key]);
        return `${subject.processedName()} modifies the  ${subject.room.name} to be more ${this.theme_key}.`;
    }



}