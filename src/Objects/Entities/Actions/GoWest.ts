import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class GoWest extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["WEST","LEFT"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }      
        subject.movement_alg = new MoveToWestDoor(subject);
        subject.emitSass(":(")
        return `${subject.processedName()} flips you off. "ASSHOLE! THERE IS NO DOOR TO THE WEST (please, stop making, me try to do, the impossible...)"`;
    }



}