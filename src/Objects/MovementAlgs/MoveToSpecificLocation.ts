//given an Entity (which will have access to location and any other pertinent information)

import { Direction, Quotidian } from "../Entities/Blorbos/Quotidian";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class MoveToSpecificLocation extends Movement{
    x: number;
    y: number;

    constructor(x:number,y:number,entity: Quotidian){
        super(entity);
        this.x = x;
        this.y = y;
    }

    clone= (entity: Quotidian)=>{
        return new MoveToSpecificLocation(this.x, this.y,entity);
    }


    moveX = (remaining_x: number)=>{
        //if object x is bigger than mine, need to go right, so d
        if(remaining_x>0){
            this.entity.direction = Direction.RIGHT;
        }else{
            this.entity.direction =Direction.LEFT;
        }
    }

    moveY = (remaining_y: number)=>{
            //if object y is bigger than mine, need to go down, so s
            if(remaining_y >0){
                this.entity.direction = Direction.DOWN;
            }else{
                this.entity.direction = Direction.UP;
            }
    }

    pickNewDirection = ()=>{
        let remaining_x = this.x - this.entity.x;
        let remaining_y = this.y - this.entity.y;
        //vary between picking x or y so you don't look like a robot so much

        const shouldX = ()=>{
            if(Math.abs(remaining_x) ===0){ //if theres no reaosn to go x, don't
                return false;
            }else if(Math.abs(remaining_y) === 0){ //no sense doing y, it won't do anything
                return true;
            }else{
                return Math.abs( Math.abs(remaining_x) - Math.abs(remaining_y)) > this.entity.width*3;
            }
        }

        if(shouldX()){
            this.moveX(remaining_x);
        }else{
            this.moveY(remaining_y);
        }
    }
   
}