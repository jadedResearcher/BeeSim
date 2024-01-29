import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import {FAMILY, LONELY, WEB, SOUL, TIME, DEATH, FIRE, STEALING, SPYING } from "../../ThemeStorage";

import { AiBeat } from "../StoryBeats/BaseBeat";

import { Quotidian, Direction, NB } from "./Quotidian";


//generic npcs have no inner ai, they just do whatever their themes and the room tell them too. they are hollow mockeries.
export class Katya extends Quotidian {
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
            default_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/katya_down.gif", width: 50, height: 50 },
            left_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/katya_left.gif", width: 50, height: 50 },
            right_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/katya_right.gif", width: 50, height: 50 },
            up_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/katya_up.gif", width: 50, height: 50 },
            down_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/katya_down.gif", width: 50, height: 50 }

        };
        const beats: AiBeat[] = [];
        super(room, "Katya", x, y, [all_themes[STEALING],all_themes[SPYING],all_themes[FIRE], all_themes[LONELY], all_themes[DEATH], all_themes[SOUL]], sprite, "She refuses to lose.", beats);
    }
}
