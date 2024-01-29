
///they have a lil house on their back
//Yongki likes them, so i decided to add one
//also, and i didn't realize this till last night
//their houses are spirals

import { Movement } from "../../MovementAlgs/BaseMovement";
import { SteadyMovement } from "../../MovementAlgs/SteadyMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { BUGS } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction, NB } from "./Quotidian";



export class Snail extends Quotidian{
    lore = "Yongki's love of snails sure has sunk deep, has it not?";
    maxSpeed = 1;
    minSpeed = 1;
    currentSpeed = 1;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new SteadyMovement(this);
    gender = NB;


    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"snailside.gif",width:55,height:29},
            left_src:{src:"snailside.gif",width:55,height:29},
            right_src:{src:"snailright.gif",width:55,height:29},
            up_src:{src:"snailup.gif",width:36,height:48},
            down_src:{src:"snaildown.gif",width:36,height:48}

        };
        const beats:AiBeat[] = [];
        super(room,"Snail Friend", x,y,[all_themes[BUGS]],sprite,"It's like a slime creature. But small. You love those. Snails have the houses on them, that's the premium shit.", beats);
    }
}
