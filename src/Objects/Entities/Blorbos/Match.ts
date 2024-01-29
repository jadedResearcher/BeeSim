//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { KILLING, FIRE, WEB, ADDICTION, MUSIC, ANGER } from "../../ThemeStorage";
import { AddThemeToRoom } from "../Actions/AddThemeToRoom";
import { DestroyObject } from "../Actions/DestroyObject";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { SpawnObjectFromThemeUnderFloorAtFeet } from "../Actions/SpawnObjectFromThemeUnderFloorAtFeet";
import { SpawnObjectFromThemeUnderFloorAtMyFeet } from "../Actions/SpawnObjectFromThemeUnderFloorAtMyFeet";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";

/*
"She was not such a tall woman, the Keeper. Skinny thing, no real muscle to her, and though she had vigor it was the feverish kind: burning but not healthy."
-https://practicalguidetoevil.wordpress.com/2020/04/10/interlude-deadhand/

was reading this chapter of A Practical Guide to Evil and it seemed perfect for ria, doesn't it?
*/

export class Ria extends Quotidian {
    lore = "Parker says her soul has the shape of an Elephant. She feels too big, too loud, too clumsy. She feels she takes up so so much room and her problems are huge and insurmountable and she just wishes she could shrink into herself. She just wishes she could F1X TH1NGS so she could stop burdening the ones she loves."
    relationshipMap = new Map<string, Relationship>([
        ["Camille,End", new Relationship("Camille,End", 1000000, "She's so smart, she always knows the right thing to say.", "Why isn't she talking to me...", "No one makes me feel as seen and understood as she does and if soul mates were real...", "Oh. Um. Yeah. Wow. She's really good.", "<3", true, true, false)]
        ,["Peewee Puppet,Glitch of Doom", new Relationship("Peewee Puppet,Glitch of Doom",500,"He's so smart! He understands exactly why it all needs to burn!","How could he be so mean to me? What does he MEAN that nothing would take the Universe's place if we destroyed it? How could he be so cruel?","Surely he's the key to finally burning it all to the ground!","<3","*giggle* Peewee is so dreamy!",true,true,false)]

    ]);
    fortitude = 2;
    prudence = 3;
    temperance = 1;
    judgement = 3;

    romanticFOdds = 1.0; //likes ladies more than others
    romanticMOdds = 0.1;
    romanticNBOdds = 0.1;
    instablityRate = 113; //if something goes wrong, ria reacts very badly

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;
    //ria is passionate
    likeMultiplier = 3.3; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 3.3; //(effects how quickly they grow to dislike ppl in general)


    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg: Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: `${blorboSpriteLocation()}/thematch.png`, width: 50, height: 50 },

        };

        const shallIGiveYouThisPear = new AiBeat(
            "Ria: Long For A Better Universe",
            [`Her eyes lock with horror on the ${TARGETSTRING}. "No....no..." She moans, sinking to her knees. "How could..." A giggle escapes her, like steam from a kettle... "How could any Universe allow this? How could..." Her voice is chocked out by flames and smoke as her body begins to ignite.  The sound of the flames sounds like music. 'If we burn it all~' they say, 'We can start anew! Won't you help me reset everything?`],
            [new TargetIsAlive({invert: true}), new TargetIsBlorboOrBox()],
            [new IncrementMyState("no")],
            false, //she only breaches the once
            1000*10
        );

        const beats:AiBeat[] = [shallIGiveYouThisPear];
        const states = [new Match(room, 0, 0)];

        super(room, "Ria", x, y, [all_themes[FIRE], all_themes[MUSIC], all_themes[WEB], all_themes[ADDICTION]], sprite,
            "Ria sure looks like she's trying to figure something out!", beats, states);
    }
}



export class Match extends Quotidian {
    lore = "She burns because there is no more hope for this Universe. She tried so hard and gave so much and finally there is nothing left at all of her but ashes and heat. There is no hope. Time to give in to Rage and start over from scratch."
    relationshipMap = new Map<string, Relationship>([
        ["Camille,End", new Relationship("Camille,End", 1000000, "She is so good at killing...", "Why isn't she killing! It's not fair!", "She makes me feel so warm... I'm burning up!", "I'd feel complete if I just had her.", "I'm obsessed with her.", true, true, false)]
        ,["Peewee Puppet,Glitch of Doom", new Relationship("Peewee Puppet,Glitch of Doom",500,"BURN WITH ME, PEEWEE~!","NO! I REFUSE TO BELIEVE IT! THERE *HAS* TO BE A POINT TO BURNING IT ALL! I WON'T LISTEN!","THE GASOLINE TO MY FIRE~!","<3","*giggle* PEEWEE IS SO DREAMY~!",true,true,false)]

    ]);
    likeMultiplier = 0.0001; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 13.0; //(effects how quickly they grow to dislike ppl in general)

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg: Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: "Placeholders/match.png", width: 50, height: 50 },

        };


        //yes, she will even burn fire. 
        const BurnObject = new AiBeat(
            "Match: Burn It All",
            [`'It MUST be enough!', you hear the fire around the lit Match sing, 'One day I will burn enough that it will all come back!' the Match sings through the flames. The ${TARGETSTRING} burn.`,`With a sound like laughter and music, the Match girl burns away the ${TARGETSTRING}  to fire and ashes and smoke.`, ` The Match girl appears to be smiling and crying all at once as she burns ${TARGETSTRING} all away.`],
            [new TargetNameIncludesAnyOfTheseWords(["Match"], {invert:true})],
            [new SpawnObjectFromThemeUnderFloorAtMyFeet(FIRE,"Despairing Flame","Surely if this burns enough something new can grow in its place."),new SpawnObjectFromThemeUnderFloorAtFeet(FIRE,"Despairing Flame","Surely if this burns enough something new can grow in its place."), new AddThemeToRoom(FIRE),new DestroyObject() ],
            true,
            1000
        );

        const beats: AiBeat[] = [BurnObject];

        super(room, "Match", x, y, [all_themes[FIRE], all_themes[MUSIC], all_themes[WEB], all_themes[ADDICTION], all_themes[ANGER], all_themes[KILLING]], sprite,
            "The Match is burning...", beats);
    }
}   