import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class DeploySass extends Action{ //lawsuit

    shortSass:string;
    
    recognizedCommands:string[] = ["SASS","SAY","QUIP"]; //nothing, so its default

    constructor(shortSass:string){
        super();
        this.shortSass = shortSass;
    }


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }      
        subject.emitSass(this.shortSass)
        return `${subject.processedName()}sasses."`;
    }



}