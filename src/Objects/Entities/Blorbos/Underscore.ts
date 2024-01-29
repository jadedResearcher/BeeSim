import { getRandomNumberBetween } from "../../../Utils/NonSeededRandUtils";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { OBFUSCATION, DECAY, LOVE, FLESH, DARKNESS, CENSORSHIP } from "../../ThemeStorage";
import { ChangeMyStabilityLevelByAmount } from "../Actions/ChangeMyStabilityLevelByAmount";
import { FuckShitUp } from "../Actions/FuckShitUp";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIS_SCRIPT } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING } from "../TargetFilter/baseFilter";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { Quotidian, Direction, NB, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";


/*
    todo: once relationship engine is cmoplete vik picks someone at random to hate, and tehn anyone they hate they insult
    (if they pick a new person to hate, or otherwise have two people to hate they forgive one)
*/

export class Vik extends Quotidian {

    relationshipMap = new Map<string, Relationship>([
        ["Parker", new Relationship("Parker",10000,"Parker is remarkably resiliant and independant. He does not need anyone to take care of him. That said, he can definitely benefit from reminders to hydrate.","...","He made me realize I didn't have to put so much of myself into protecting Yongki. Caregiver fatigue really snuck up on me.","...","Parker is the only person I trust to not take advanatage of me even when I am having a bad day.",true,false,true)]
    ]);

    fortitude = 3;
    prudence = 5;
    temperance = 5;
    judgement = 5;
    lore = "Their soul has long since rotted off them in viscous chunks, but Parker claims it once was a cat.";
    gender = NB;
    romanticFOdds = 0.0;
    romanticMOdds = 0.0;
    romanticNBOdds = 0.0;
    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;
    likeMultiplier = 0.1; //vik is grouchy, what can i say
    dislikeMultiplier = 3.0;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg: Movement = new NoMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: `${blorboSpriteLocation()}/_.png`, width: 56, height: 100 },

        };
        const becomeHungry = new AiBeat(
            `${SUBJECTSTRING}: Become Hungry`,
            [`${SUBJECTSTRING}'s many eyes all close briefly. When they open again, something is wrong. `],
            [new TargetStabilityLevelLessThanAmount(0, { invert: true, singleTarget: true, kMode: true })], //don't go if you're already unstable
            [new ChangeMyStabilityLevelByAmount(-13), new FuckShitUp("1")],
            true,
            1000 * 30);

        const breachIfTooHungry = new AiBeat(
            `${SUBJECTSTRING}: Embrace Corruption`,
            [`You don't understand what you are seeing. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. Something is wrong. `],
            [new TargetStabilityLevelLessThanAmount(13, { singleTarget: true, kMode: true }), new TargetIsBreeching({ invert: true, singleTarget: true, kMode: true })],
            [new IncrementMyState("")],
            true,
            1000 * 30
        );
        const beats: AiBeat[] = [breachIfTooHungry,becomeHungry];
        super(room, "Vik", x, y, [all_themes[DARKNESS], all_themes[CENSORSHIP], all_themes[OBFUSCATION], all_themes[DECAY], all_themes[LOVE], all_themes[FLESH]], sprite, "Their face is lightly censored, but you can still make out most of them.", beats);
    }



    die = (causeOfDeath: string, killer: Quotidian) => {
        if (!this.dead) {
            //things do NOT stop being censored just because vik is dead. if anything, they get worse. 

            this.room.applyFilter(`blur(500) hue-rotate(681deg) brightness(60%)`,true);
            this.flavorText = `Here lies ${this.name}.  They died of ${causeOfDeath}.`;
            this.image.src = `images/Walkabout/Objects/TopFloorObjects/grave.png`;
            this.room.processDeath(this);
            this.dead = true;
            this.killerName = killer.name;
            this.container.style.zIndex = `${12}`; //fade into the background

        }

    }

    tick = (actionRate: number, roomBeats: AiBeat[]) => {
        //console.log("JR NOTE: trying to tick: ", this.name);
        this.checkFilters();//dying does not stop vik, if anything it gets worse

        if (this.dead) {
            return;
        }
        if(this.breaching){
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
            console.log(`%cDON'T LOOK!%c  DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LO DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! OK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK! DON'T LOOK!`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
        
        }
        //don't mind FRIEND, just a lil parasite on you 
        if ((this.friend)) {
            this.friend.tick();
        }
        //you can move quicker than you can think
        this.processAiBeat(roomBeats,this.itsBeenAwhileSinceLastBeat(actionRate));
    
        this.movement_alg.tick();
        this.syncSpriteToDirection();
        this.updateRendering();
    }
}

export class Underscore extends Quotidian {
    lore = "Their soul has long since rotted off them in viscous chunks, but Parker claims it once was a cat.";

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg: Movement = new NoMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: "error.png", width: 56, height: 100 },

        };
        const beats: AiBeat[] = [];
        super(room, "_", x, y, [all_themes[DARKNESS], all_themes[CENSORSHIP], all_themes[OBFUSCATION], all_themes[DECAY], all_themes[LOVE], all_themes[FLESH]], sprite, "The Censorship is for your protection.", beats);
    }
}