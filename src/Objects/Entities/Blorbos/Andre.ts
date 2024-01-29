import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import {FAMILY, LONELY, WEB, SOUL, TIME, STEALING } from "../../ThemeStorage";

import { AiBeat } from "../StoryBeats/BaseBeat";

import { Quotidian, Direction, NB } from "./Quotidian";


//generic npcs have no inner ai, they just do whatever their themes and the room tell them too. they are hollow mockeries.
export class Andre extends Quotidian {
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
            default_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/andre_down.gif", width: 50, height: 50 },
            left_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/andre_left.gif", width: 50, height: 50 },
            right_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/andre_right.gif", width: 50, height: 50 },
            up_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/andre_up.gif", width: 50, height: 50 },
            down_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/andre_down.gif", width: 50, height: 50 }

        };
        const beats: AiBeat[] = [];
        super(room, "Andre", x, y, [all_themes[TIME],all_themes[FAMILY], all_themes[SOUL], all_themes[STEALING]], sprite, "Does he love Goncharov?", beats);
    }
}
