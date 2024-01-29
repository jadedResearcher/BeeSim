import { getRandomNumberBetween } from "../../../Utils/NonSeededRandUtils";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { OBFUSCATION, DECAY, LOVE, FLESH, DARKNESS, CENSORSHIP, BURIED, STEALING, DOLLS, ANGER, KILLING, SPYING } from "../../ThemeStorage";
import { ChangeMyStabilityLevelByAmount } from "../Actions/ChangeMyStabilityLevelByAmount";
import { FuckShitUp } from "../Actions/FuckShitUp";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIS_SCRIPT } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING } from "../TargetFilter/baseFilter";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { Quotidian, Direction, NB, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";



export class Parker extends Quotidian {
    lore = "Parker digs and digs adn digs yet remains trapped. The Lord of Space sets the rules of this setting, and Parker, as the Thief of Space can not longer steal himself from setting to setting.  He was born with the rest in the Corporation's setting, but he placed himself in a Doomed setting from his favorite video game when the Despair became too much.  When the Despair inevitably became too much in the new setting, he stole himself away again, going back this time to drag away any of his blorbos from his previous life he could find.  He hates. HATES that Wanda has trapped him here. He wants to keep going. Tunneling and tunenling through universes and settings until he finally finds one where he can be happy. Surely the next one, right?  He doesn't know what his soul would be shaped like in a Daemon AU.  He's not a CHARACTER in the story, he's the one who Watches. If he digs enough, maybe the AU will be real? He's trying so hard. It's hard being Wasted, its hard and no one understands. ";
    relationshipMap = new Map<string, Relationship>([
        ["Vik,_", new Relationship("Vik,_,",10000,"Bestie cares so much about everyone!","...","Vik convinced me I don't have to be COMPLETELY separate from the narrative! And, PLUS: Vik's immune to bullets!","...","Bestie helps me remember to hyrdate! Without bestie, I'm not myself...",true,false,true)]
    ]);
    fortitude = 2;
    prudence = 5;
    temperance = 5;
    judgement = 5;
    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg: Movement = new NoMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: `${blorboSpriteLocation()}/theshot.png`, width: 56, height: 100 },

        };
        const beats: AiBeat[] = [];
        super(room, "Parker", x, y, [all_themes[BURIED], all_themes[STEALING], all_themes[KILLING], all_themes[SPYING]], sprite, "The Censorship is for your protection.", beats);
    }
}
