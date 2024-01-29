//given an Entity (which will have access to location and any other pertinent information)

import { Direction, Quotidian } from "../Entities/Blorbos/Quotidian";
import { PhysicalObject } from "../PhysicalObject";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class MoveToSpecificPhysicalObject extends Movement{
    object: PhysicalObject

    constructor(object: PhysicalObject,entity: Quotidian){
        super(entity);
        this.object = object;
    }

    customShit =()=>{

    }

    clone= (entity: Quotidian)=>{
        return new MoveToSpecificPhysicalObject(this.object,entity);
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
        const ele = this.object.container;
        const myRect = ele.getBoundingClientRect();
        const clientRect = this.entity.container.getBoundingClientRect();
        let remaining_x = myRect.x -clientRect.x;
        let remaining_y = myRect.y - clientRect.y;
        if(remaining_y>0){
            //coming from above, so shoot for the bottom to touch.
            remaining_y = myRect.bottom - clientRect.bottom;
        }

        const shouldX = ()=>{
            if(Math.abs(remaining_x) < this.entity.currentSpeed){ //if theres no reaosn to go x, don't
                return false;
            }else if(Math.abs(remaining_y) < this.entity.currentSpeed){ //no sense doing y, it won't do anything
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