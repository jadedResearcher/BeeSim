import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

//why yes you can just spam this for hilarious effect, you're welcome
export class ResumeSimulation extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["RESUME"]; 


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.room.resume();
        return `Everything begings moving again.`;
    }



}