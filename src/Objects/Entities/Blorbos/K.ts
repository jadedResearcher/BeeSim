import { getRandomNumberBetween } from "../../../Utils/NonSeededRandUtils";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { OBFUSCATION, DECAY, LOVE, FLESH, DARKNESS, CENSORSHIP, BURIED, STEALING, DOLLS, ANGER, KILLING, SPYING, LIGHT } from "../../ThemeStorage";
import { ChangeMyStabilityLevelByAmount } from "../Actions/ChangeMyStabilityLevelByAmount";
import { FuckShitUp } from "../Actions/FuckShitUp";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIS_SCRIPT } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING } from "../TargetFilter/baseFilter";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { Quotidian, Direction, NB, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";



export class Khana extends Quotidian {
    lore="Parker says he has the soul of a mosquito. Something tiny and vulnerable, who has no CHOICE but to risk annoying you for the very chance to live. "

    fortitude = 1;
    prudence = 3;
    temperance = 2;
    judgement = 1;
    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg: Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: `${blorboSpriteLocation()}/k.png`, width: 56, height: 100 },

        };
        const beats: AiBeat[] = [];
        //funny how similar he is, on a suface level, to parker
        super(room, "K", x, y, [all_themes[ANGER],all_themes[LIGHT], all_themes[STEALING], all_themes[KILLING], all_themes[SPYING]], sprite, "He wants to be looked at. Give him attention. Now!", beats);
    }
}
