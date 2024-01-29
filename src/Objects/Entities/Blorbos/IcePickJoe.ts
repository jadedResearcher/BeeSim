import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { SOUL, BURIED, CLOWNS, KILLING, TWISTING } from "../../ThemeStorage";

import { AiBeat } from "../StoryBeats/BaseBeat";

import { Quotidian, Direction, NB } from "./Quotidian";


//generic npcs have no inner ai, they just do whatever their themes and the room tell them too. they are hollow mockeries.
export class IcePickJoe extends Quotidian {
    lore = "Wait. Who is this?";
    fortitude = 2;
    prudence = 5;
    temperance = 5;
    judgement = 5;
    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg: Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/icepickjoe_down.gif", width: 50, height: 50 },
            left_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/icepickjoe_left.gif", width: 50, height: 50 },
            right_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/icepickjoe_right.gif", width: 50, height: 50 },
            up_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/icepickjoe_up.gif", width: 50, height: 50 },
            down_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/icepickjoe_down.gif", width: 50, height: 50 }

        };
        const beats: AiBeat[] = [];
        super(room, "Icepick Joe", x, y, [all_themes[TWISTING],all_themes[KILLING],all_themes[CLOWNS], all_themes[SOUL], all_themes[BURIED]], sprite, "He won't go back to the asylum.", beats);
    }
}
