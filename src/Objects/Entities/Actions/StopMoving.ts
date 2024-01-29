import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class StopMoving extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["STOP","FREEZE","STILL","STAND"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.movement_alg = new NoMovement(subject);
        return `${subject.processedName()} comes to a halt.`;
    }



}