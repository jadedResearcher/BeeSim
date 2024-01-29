import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class GoEast extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["EAST","RIGHT"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.movement_alg = new MoveToEastDoor(subject);
        (subject.movement_alg as MoveToEastDoor) .detectEle();
        if ((subject.movement_alg as MoveToEastDoor).ele) {
            subject.emitSass("OK")
            return `${subject.processedName()} starts heading to the EAST DOOR.`;
        }else{
            subject.emitSass("???")
            return `${subject.processedName()} can't find the EAST DOOR. They start pacing anxiously.`;  
        }
    }



}