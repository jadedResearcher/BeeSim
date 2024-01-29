import { MoveToSouthDoor } from "../../MovementAlgs/MoveToSouthDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class GoSouth extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["SOUTH","DOWN"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.movement_alg = new MoveToSouthDoor(subject);
        (subject.movement_alg as MoveToSouthDoor) .detectEle();
        if ((subject.movement_alg as MoveToSouthDoor).ele) {
            subject.emitSass("OK")
            return `${subject.processedName()} starts heading to the SOUTH DOOR.`;
        }else{
            subject.emitSass("???")
            return `${subject.processedName()} can't find the SOUTH DOOR. They start pacing anxiously.`;  
        }
    }



}