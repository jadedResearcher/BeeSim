//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Blorbos/Quotidian";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class NoMovement extends Movement{

    toString = ()=>{
        return "NoMovement"
    }

    tick = ()=>{
        //does nothing rip
    }

    clone= (entity: Quotidian)=>{
        return new NoMovement(entity);
    }
}