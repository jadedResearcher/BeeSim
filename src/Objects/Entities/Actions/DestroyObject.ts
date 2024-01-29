
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian } from "../Blorbos/Quotidian";
import { Theme } from "../../Theme";
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { TARGETSTRING } from "../TargetFilter/baseFilter";


export class DestroyObject extends Action { //lawsuit

    

    recognizedCommands: string[] = []

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const targets = beat.targets;
        if(targets.length < 1){
            return `${subject.processedName()} can't see anything to descend into like that...`;
        }
        for(let target of targets){
            target.room.eraseObject(target);
        }
        subject.emitSass("?!")
        return `${subject.processedName()} destroys utterly the ${TARGETSTRING}.`;
    }

}