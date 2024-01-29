//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FIRE, ANGELS, WEB, ADDICTION, MUSIC, LONELY, SERVICE, STEALING } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction, MALE, blorboSpriteLocation } from "./Quotidian";



export class Solemn extends Quotidian{
    lore = "Parker says witherby's soul is a Hare...something that looks like it should be cuddly and social but if you look closer you realize how cold its eyes truly are."
    gender = MALE;
    fortitude = 2; //he can kick your ribs in, if he needs to
    prudence = 3; 
    temperance = 4; //no matter how much he wants something, he can usually hold himself back. this is...not a good thing. it leaves him so isolated and...cold
    judgement = 1; //poor boy is always second guessing himself

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;
    romanticFOdds = 0.0;
    romanticMOdds = 1.0;
    romanticNBOdds = 0.5;
    likeMultiplier = 0.1; //it takes him a long time to warm up to new people
    dislikeMultiplier = 0.1; 
    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:`${blorboSpriteLocation()}/thesolemn.png`,width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/solemn.png",width:50,height:50},

        };
        const beats:AiBeat[] = [];
        super(room,"Solemn", x,y,[all_themes[LONELY],all_themes[ANGELS],all_themes[SERVICE],all_themes[STEALING]],sprite,
        "Witherby looks very friendly!", beats);
    }
}   
