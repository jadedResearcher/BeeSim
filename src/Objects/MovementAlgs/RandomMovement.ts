//given an Entity (which will have access to location and any other pertinent information)

import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";
import { Quotidian } from "../Entities/Blorbos/Quotidian";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class RandomMovement extends Movement{

    toString = ()=>{
        return `RandomMovement ${this.entity.direction}, ${this.entity.currentSpeed}`
    }

    pickNewDirection = ()=>{
        if(Math.random() > 0.75){
            this.entity.direction = getRandomNumberBetween(1,4);
        }
    }

    clone= (entity: Quotidian)=>{
        return new RandomMovement(entity);
    }
   
}