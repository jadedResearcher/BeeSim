//given an Entity (which will have access to location and any other pertinent information)

import { Direction, Quotidian } from "../Entities/Blorbos/Quotidian";

//decides where to move next.
//mostly useful for testing, just keeps going int he direction its going and bounces off walls
export class Movement{
    entity: Quotidian;

    constructor(entity: Quotidian){
        this.entity = entity;
    }

    clone= (entity: Quotidian)=>{
        return new Movement(entity);
    }

    //alg shouldn't need to change too much about this, besides what happens when you hit a wall
    moveInDirection = ()=>{
        let simulated_x = this.entity.x;
        let simulated_y = this.entity.y;
        if(this.entity.direction === Direction.UP){
            simulated_y -= this.entity.currentSpeed;
        }else if(this.entity.direction === Direction.DOWN){
            simulated_y += this.entity.currentSpeed;
        }else if(this.entity.direction === Direction.LEFT){
            simulated_x -= this.entity.currentSpeed;
        }else if(this.entity.direction === Direction.RIGHT){
            simulated_x += this.entity.currentSpeed;
        }

        if(this.canMove(simulated_x, simulated_y)){
            this.entity.x = simulated_x;
            this.entity.y = simulated_y;
        }else{
            this.handleWall();
        }
    }

    //honestly this is stupidly easier than angles, so keep this from East
    handleWall = ()=>{
        if(this.entity.direction === Direction.UP){
            this.entity.direction = Direction.DOWN;
        }else if(this.entity.direction === Direction.DOWN){
            this.entity.direction = Direction.UP;
        }else if(this.entity.direction === Direction.LEFT){
            this.entity.direction = Direction.RIGHT;
        }else if(this.entity.direction === Direction.RIGHT){
            this.entity.direction = Direction.LEFT;
        }

    }

    canMove = (x:number,y:number)=>{
        if(this.entity.direction === Direction.UP){
            return this.canGoUp(y);
        }else if(this.entity.direction === Direction.DOWN){
            return this.canGoDown(y);
        }else if(this.entity.direction === Direction.LEFT){
            return this.canGoLeft(x);
        }else if(this.entity.direction === Direction.RIGHT){
            return this.canGoRight(x);
        }

    }

    canGoLeft = (x:number,)=>{
        return x>0;
    }

    canGoRight = (x:number,)=>{

        return x+this.entity.width<this.entity.room.width;
    }

    canGoUp = (y:number,)=>{

        return y>this.entity.room.wallHeight;

    }

    canGoDown = (y:number,)=>{

        return y+this.entity.height<this.entity.room.height;
    }

    pickSpeed = ()=>{
        //rarely a movement alg will change this (speed up to hunt or flee for example)
    }

    pickNewDirection = ()=>{
        //bog simple, just go in the direction you were already going.
        //children of this will do something different, for example change direction to move towards a goal
    }

    customShit = ()=>{

    }

    tick = ()=>{
        //dont' worry about rendering, you're just moving the quotidian, it'll render itself
        this.customShit();
        this.pickSpeed();
        this.pickNewDirection();
        this.moveInDirection();
    }

}