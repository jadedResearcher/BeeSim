import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import {FAMILY, LONELY, WEB, SOUL, TIME } from "../../ThemeStorage";

import { AiBeat } from "../StoryBeats/BaseBeat";

import { Quotidian, Direction, NB } from "./Quotidian";
//https://at.tumblr.com/jadedresearcher/remember-to-hydrate/cdr353ii19xv
//if you like goncharov, how about this game I found about a fandom that does't exist? https://ifarchive.org/if-archive/games/competition2021/Games/A%20Paradox%20Between%20Worlds/index.html

//Linda Codega of Gizmodo remarked on the enthusiasm around the meme as "an inspiring example of collective storytelling and spontaneous fandom generation, inspired by the community itself. Essentially, Goncharov (1973) is not a film, but a game. And only Tumblr knows the rules, because the rules of Goncharov (1973) are the rules of Tumblr itself."
//generic npcs have no inner ai, they just do whatever their themes and the room tell them too. they are hollow mockeries.
export class Goncharov extends Quotidian {
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
            default_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/goncharov_down.gif", width: 50, height: 50 },
            left_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/goncharov_left.gif", width: 50, height: 50 },
            right_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/goncharov_right.gif", width: 50, height: 50 },
            up_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/goncharov_up.gif", width: 50, height: 50 },
            down_src: { src: "npcs/_PrettyLittlePixel_Characters_1_/goncharov_down.gif", width: 50, height: 50 }

        };
        const beats: AiBeat[] = [];
        super(room, "Goncharov", x, y, [all_themes[TIME],all_themes[FAMILY], all_themes[LONELY], all_themes[WEB], all_themes[SOUL]], sprite, "He's gonna gonch ya.", beats);
    }
}
