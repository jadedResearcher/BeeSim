//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Blorbos/Quotidian";
import { MoveToSpecificElement } from "./MoveToSpecificElement";

//decides where to move next.
export class MoveToSouthDoor extends MoveToSpecificElement{


    constructor(entity: Quotidian){
        super( "#southDoor",entity);
    }

    clone= (entity: Quotidian)=>{
        return new MoveToSouthDoor(entity);
    }

   
}