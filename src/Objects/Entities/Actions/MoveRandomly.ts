import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";

export class MoveRandomly extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["EXPLORE","WANDER","WIGGLER"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.movement_alg = new RandomMovement(subject);
        return `${subject.processedName()} starts wandering around.`;
    }



}