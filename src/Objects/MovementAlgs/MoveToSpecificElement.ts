//given an Entity (which will have access to location and any other pertinent information)

import { Direction, Quotidian } from "../Entities/Blorbos/Quotidian";
import { randomRoomWithThemes } from "../RoomEngine/Room";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class MoveToSpecificElement extends Movement{
    ele?: HTMLElement
    ele_id:string;

    constructor(ele_id: string,entity: Quotidian){
        super(entity);
        this.ele_id = ele_id;
    }

    clone= (entity: Quotidian)=>{
        return new MoveToSpecificElement(this.ele_id,entity);
    }

    customShit =()=>{
        if(!this.ele){
            this.detectEle();
        }
    }

    detectEle = ()=>{
        const door = document.querySelector(this.ele_id) as HTMLElement;
        if(door){
            this.ele = door;
        }
    }

    moveX = (remaining_x: number)=>{
        console.log("JR NOTE: move x")
        //if object x is bigger than mine, need to go right, so d
        if(remaining_x>0){
            this.entity.direction = Direction.RIGHT;
        }else{
            this.entity.direction =Direction.LEFT;
        }
    }

    moveY = (remaining_y: number)=>{
        console.log("JR NOTE: move y", remaining_y)

            //if object y is bigger than mine, need to go down, so s
            if(remaining_y >0){
                console.log("JR NOTE: i want to move down")

                this.entity.direction = Direction.DOWN;
            }else{
                console.log("JR NOTE: i want to move up")

                this.entity.direction = Direction.UP;
            }
    }

    pickNewDirection = ()=>{
        if(!this.ele){
            return;
        }
        const myRect = this.ele.getBoundingClientRect();
        const clientRect = this.entity.container.getBoundingClientRect();

        let myMiddleX = (myRect.left + myRect.right)/2
        let myMiddleY = (myRect.top + myRect.bottom)/2

        let clientMiddleX = (clientRect.left + clientRect.right)/2
        let clientMiddleY = (clientRect.top + clientRect.bottom)/2


        let remaining_x = myMiddleX - clientMiddleX;
        let remaining_y = myMiddleY - clientMiddleY;;

        /*
        if(this.entity.direction === Direction.DOWN){
            remaining_y = myRect.bottom - clientRect.top;
        }else{
            remaining_y = myRect.top - clientRect.bottom;
        }

        if(this.entity.direction === Direction.LEFT){
            remaining_x = myRect.left -clientRect.right;
        }else{
            remaining_x = myRect.right -clientRect.left;
        }*/

        console.log("JR NOTE: pickNewDirection",{direction: this.entity.direction,myRect,clientRect,remaining_x, remaining_y, speed:this.entity.currentSpeed})
        if(remaining_y>0){
            //coming from above, so shoot for the bottom to touch.
            remaining_y = myRect.bottom - clientRect.bottom;
        }

        const shouldX = ()=>{
            if(Math.abs(remaining_x) < this.entity.currentSpeed){ //if theres no reaosn to go x, don't
                console.log("JR NOTE: I think that i have no more x to move")
                return false;
            }else if(Math.abs(remaining_y) < this.entity.currentSpeed){ //no sense doing y, it won't do anything
                console.log("JR NOTE: I think that i have no more y to move")

                return true;
            }else{
                console.log("JR NOTE: I think that i could really go either direction")
                return Math.abs(remaining_x) < Math.abs(remaining_y);
                //return Math.abs( Math.abs(remaining_x) - Math.abs(remaining_y)) > this.entity.width;
            }
        }

        if(shouldX()){
            this.moveX(remaining_x);
        }else{
            this.moveY(remaining_y);
        }
    }
   
}