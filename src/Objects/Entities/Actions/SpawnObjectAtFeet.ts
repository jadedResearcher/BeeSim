
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { PhysicalObject } from "../../PhysicalObject";

export class SpawnObjectAtFeet extends Action{ //lawsuit
    
    recognizedCommands:string[] =[]
    object: PhysicalObject;

    constructor(object: PhysicalObject){
        super();
        this.object = object;
    }

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        const item = this.object.clone();
        item.name = beat.processTags(this.object.name);
        item.flavorText = beat.processTags(this.object.flavorText);
        item.x = beat.targets[0].x;
        item.y = beat.targets[0].y;
        item.updateRendering();
        subject.room.addItem(item);
        

        return `${subject.processedName()} drops a(n) ${this.object.name}.`;
    }



}