//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FIRE, ANGELS, WEB, ADDICTION, MUSIC, SPYING, OBFUSCATION, KNOWING } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { FollowObject } from "../Actions/FollowObject";
import { GiveRandomObjectToTarget } from "../Actions/GiveRandomObjectToTarget";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { MeleeKill } from "../Actions/MeleeKill";
import { MoveRandomly } from "../Actions/MoveRandomly";
import { PickupObject } from "../Actions/PickupObject";
import { StopMoving } from "../Actions/StopMoving";
import { AiBeat, ITEMSTRING } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsTheKillerOfBlorboNamed } from "../TargetFilter/TargetIstheKillerOfBlorboNamed";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction, FEMALE, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";



export class Devona extends Quotidian{
    lore = "Parker says her soul is a small grey parrot. Always watching, always repeating, always hiding. "
    gender = FEMALE;
    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;
    romanticFOdds = 0.0;
    romanticMOdds = 0.0;
    romanticNBOdds = 0.0;
    fortitude = 1;
    prudence = 5;
    temperance = 2;
    judgement = 2;

    relationshipMap = new Map<string, Relationship>([
        ["Neville,Fortitudinous Punishing Twin", new Relationship("Neville,Fortitudinous Punishing Twin,",10000,"He is so brave! I wish I could just ignore how scary the world is...","...","I want to spend my life helping him parse data...","...","Ever since I saved him from the Punishing Bird, we've been together. I don't want to stop.",true,false,true)]
    ]);
    

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:`${blorboSpriteLocation()}/thetwins1.png`,width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };

        //she's too nervous to pocket actual living creatures but if its dead or inanimate she will
        const approachObject = new AiBeat(
            "Devona: Investigate Object",
            [`Devona begins slinking towards the ${TARGETSTRING}.`],
            [new TargetIsAlive({invert: true}),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true, invert: true})],
            [new FollowObject()],
            true,
            1000*60
        );

        //devona! stop pickign up living creatures and putting them in your pocket! thats for breach mode
        const pickupObject = new AiBeat(
            "Devona: Acquire Object",
            [`Devona's eyes dart from side to side as she pockets the ${TARGETSTRING}.`],
            [new TargetIsAlive({invert: true}), new TargetIsWithinRadiusOfSelf(5, {singleTarget:true})],
            [new PickupObject()],
            true,
            1000*90
            ,true
        );

        //if devona has an object, she brings it to twinsey
        const approachNevilleWithObject = new AiBeat(
            "Devona: Bring Object to Twin",
            [`Devona calls out to Neville, telling him she has something for him to Analyze.`],
            [new IHaveObjectWithName([]), new TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true, invert: true})],
            [new FollowObject()],
            true,
            1000*30
        );

        const giveNevilleObject = new AiBeat(
            "Devona: Hand Over Object For Analysis",
            [`Handing over the ${ITEMSTRING}, Devona smiles as she see's Neville's face light up under his sunglasses.`],
            [new IHaveObjectWithName([]), new TargetNameIncludesAnyOfTheseWords(["Neville"], {singleTarget: true}), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true})],
            [new GiveRandomObjectToTarget()],
            true,
            1000*60,
            true
        );

        const punishTheguilty = new AiBeat(
            "Devona: Punish Your Brother's Killer",
            [`With a deafening cry of grief and rage, Devona's body begins twisting and crunching until the Insightful Punishing Twin emerges.`],
            [new TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsAlive({invert:true})],
            [new IncrementMyState("no")],
            true,
            1000*60
            ,true
        );

        const beats:AiBeat[] = [punishTheguilty, giveNevilleObject,approachNevilleWithObject,pickupObject,approachObject];
        const states = [new InsightTwin(room,0,0)];

        super(room,"Devona", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[KNOWING]],sprite,
        "Devona is staring at you.", beats,states);
    }
}   

export class InsightTwin extends Quotidian{
    lore = "She seeks only retribution for the death of her Twin. It's not her fault she's so scared, so big, so awkward. She causes so many problems.  "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 10;
    breached = true;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };

    
        /*
            Devona has high Insight and knows EXACTLY where her target is, and moves towards them. Hhowever, she has no stamina and might just unbreach out of nowhere.  

            However, she is highly destructive and kills anything in her way.
              She knows she doesn't have the TIME to go around people or deal with threats.
        */

        const hunt = new AiBeat(
            "Insightful Punishing Twin: Hunt for the Killer of Your Twin",
            [`The ${SUBJECTSTRING} is laser focused on tracking down the one who killed Neville.  It doesn't seem to have much stamina, tho...`],
            [new TargetIsTheKillerOfBlorboNamed("Neville"), new TargetIsWithinRadiusOfSelf(5, {invert: true}), new TargetIsAlive({invert:false})],
            [new FollowObject(), new DeploySass("!")],
            true,
            1000*60
        );
        const unbreachBecauseYouAreLeTired = new AiBeat(
            "Insightful Punishing Twin: Exhaust yourself",
            [`The Insightful Punishing Twin rages and thrashes around and seems to completely tire itself out.  Devona emerges, unconscious, tears streaming down her sleeping face.`],
            [new RandomTarget(0.0003)],
            [new IncrementMyState("no"), new StopMoving()],
            true,
            1000*60*3
        );

        const mourn = new AiBeat(
            "Insightful Punishing Twin: Mourn your Twin",
            [`The ${SUBJECTSTRING} paws gently at ${TARGETSTRING}... It looks so sad...`],
            [new TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsWithinRadiusOfSelf(5)],
            [new DeploySass(":(")],
            true,
            1000*60
        );

        const visitGrave = new AiBeat(
            "Insightful Punishing Twin: Mourn your Twin",
            [`The ${SUBJECTSTRING} howls with sadness... and begins making a destructive bee line back to the ${TARGETSTRING}`],
            [new TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsWithinRadiusOfSelf(5, {invert: false}),new RandomTarget(0.5)],
            [new FollowObject()],
            true,
            1000*60
        );
        
        const kill = new AiBeat(
            "Insightful Punishing Twin: Punish Blindly",
            [`The ${SUBJECTSTRING} is lashing out blindly. The torso of the ${SUBJECTSTRING} opens with a meaty squelch and crunches down on the ${TARGETSTRING}. Shreds of them are all that remain.`],
            [new TargetIsWithinRadiusOfSelf(5)],
            [new MeleeKill("being eaten by the Insightful Punishing Twin"), new DeploySass(":)")],
            true,
            1000*60,
            true
        );

        const unbreach = new AiBeat(
            "Insightful Punishing Twin: Relax",
            [`The Insightful Punishing Twin withers into itself, and Devona emerges once more. She appears to be unconcious, but there is a slight smile on her blood soaked face. Her brother is avenged.`],
            [new TargetIsTheKillerOfBlorboNamed("Devona"), new TargetIsAlive({invert:true})],
            [new IncrementMyState("no")],
            true,
            1000*60
        );
        

        const beats:AiBeat[] = [kill,hunt, mourn,visitGrave, unbreach,unbreachBecauseYouAreLeTired];

        super(room,"Insightful Punishing Twin", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[KNOWING]],sprite,
        "The Insightful Punishing Twin is hunting.", beats);
    }
}   


