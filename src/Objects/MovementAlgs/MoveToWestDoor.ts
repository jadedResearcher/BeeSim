//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Blorbos/Quotidian";
import { Movement } from "./BaseMovement";


//decides where to move next.
export class MoveToWestDoor extends Movement{


    constructor(entity: Quotidian){
 
        super(entity);
    }

    clone= (entity: Quotidian)=>{
        return new MoveToWestDoor(entity);
    }




   
}