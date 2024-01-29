import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class PauseSimulation extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["PAUSE"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.room.pause();
        return `Everything comes to a halt.`;
    }



}