
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";


export class EnterObject extends Action{ //lawsuit

    
    recognizedCommands:string[] =["DESCEND", "ENTER", "DIG", "FALL","EXPLORE"]

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const target = beat.targets;
        if(target.length < 1){
            return `${subject.processedName()} can't see anything to descend into like that...`;
        }
        target[0].enterObject()
        subject.emitSass("?!")
        return `${subject.processedName()} descends into the conceptual existence of ${target[0].processedName()}. This is probably a good idea.`;
    }



}