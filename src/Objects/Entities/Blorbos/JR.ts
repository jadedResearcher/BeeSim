
import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, TWISTING, WEB, WASTE, LONELY } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction, NB } from "./Quotidian";


//something is different about this jr, what could it be
export class JR extends Quotidian{
    lore = "My creator says that Mind made sense for AUs and choices and artificial intelligence. However, something different was needed for Zampanio. Connecting disparate fandoms, connecting disparate people. The red string of veins or thread connecting us all.";
    gender = NB;

    maxSpeed = 5;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"JRmoveleftblood.gif",width:50,height:50},
            left_src:{src:"JRmoveleftblood.gif",width:50,height:50},
            right_src:{src:"JRmoverightblood.gif",width:50,height:50},
            up_src:{src:"jrwalkgoupblood.gif",width:50,height:50},
            down_src:{src:"jrwalkforwardblood.gif",width:50,height:50}

        };
        const beats:AiBeat[] = [];
        super(room,"JR", x,y,[all_themes[TWISTING],all_themes[WEB],all_themes[WASTE],all_themes[LONELY], all_themes[KILLING]],sprite,"Boy this sure is an off brand JR, huh?", beats);
    }
}   
