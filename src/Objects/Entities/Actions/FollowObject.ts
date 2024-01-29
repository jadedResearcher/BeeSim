
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { MoveToSpecificPhysicalObject } from "../../MovementAlgs/MoveToSpecificPhysicalObject";

export class FollowObject extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["FOLLOW","APPROACH","CRAWL","SLITHER","WALK","MOVE","GO","ACCOMPANY","STICK"]; 

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const target = beat.targets;
        if(target.length < 1){
            return `${subject.processedName()} can't see anything to move towards like that...`;
        }
        subject.movement_alg = new MoveToSpecificPhysicalObject(target[0], subject);
        subject.emitSass("!")
        return `${subject.processedName()} starts moving towards the ${target[0].processedName()}.`;
    }



}