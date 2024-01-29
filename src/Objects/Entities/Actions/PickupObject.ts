
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { MoveToSpecificPhysicalObject } from "../../MovementAlgs/MoveToSpecificPhysicalObject";
import { Room } from "../../RoomEngine/Room";

export class PickupObject extends Action{ //lawsuit

    
    recognizedCommands:string[] =["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK","PICK"]

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const target = beat.targets;
        if(target.length < 1){
            return `${subject.processedName()} can't see anything to take like that...`;
        }
        subject.pickupObject(target[0]);
        if(target[0] === subject.room.peewee){
            subject.enterObject();
        }
        subject.emitSass("!")
        return `${subject.processedName()} takes the  ${target[0].processedName()}.`;
    }



}