//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, SPYING, OBFUSCATION, MATH } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { DestroyRandomObjectInInventoryAndPhilosophize } from "../Actions/DestroyRandomObjectInInventoryAndPhilosophise";
import { FollowObject } from "../Actions/FollowObject";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { MeleeKill } from "../Actions/MeleeKill";
import { MoveRandomly } from "../Actions/MoveRandomly";
import { AiBeat, BONUSSTRING, ITEMSTRING } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsTheKillerOfBlorboNamed } from "../TargetFilter/TargetIstheKillerOfBlorboNamed";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction, MALE, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";



export class Neville extends Quotidian{
    lore = "According to Parker, his soul is like an Emu. Powerful and fast, yet willing to starve itself to protect those that matter. "
    relationshipMap = new Map<string, Relationship>([
        ["Devona,Insightful Punishing Twin", new Relationship("Devona,Insightful Punishing Twin,",10000,"She is the bravest person I know. She never gives up.","...","I want to spend my life seeing the things she finds.","...","We promised to protect each other forever.",true,false,true)]

    ]);
    fortitude = 5;
    prudence = 1;
    temperance = 2;
    judgement = 2;
    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;
    gender = MALE;

    likeMultiplier = 3.3; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 0.3; 

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:`${blorboSpriteLocation()}/thetwins2.png`,width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };
        


        
        /*
        extremely important to note here, neville is doing the OPPOSITE of what he'd do in reality. 

        this shitty lil broken ai quotidian verison of neville is DESTROYING knowledge and highlighting irrelevancies

        when what he's supposed to do is passively allow the destruction of what is irrelevant in order to highlight the Most Important Thing about an object. pare it down to its essentials
        */
        const extractMeaningFromObject = new AiBeat(
            "Neville: Destroy and Extract Knowledge",
            [`Neville notices he has a(n) ${ITEMSTRING}. He quickly erases it from existence and explains to anyone listening that "${BONUSSTRING}" <p>He seems happy to understand the core of this item. He says ":)  I learned something!"</p>   `],
            [new IHaveObjectWithName([])],
            [new DestroyRandomObjectInInventoryAndPhilosophize(), new DeploySass(":)")],
            true,
            1000*60
        );

        const punishTheguilty = new AiBeat(
            "Neville: Punish Your Sisters's Killer",
            [`With a silent scream of mute horror, Neville's body begins twisting and crunching until the Fortitudinous Punishing Twin emerges.`],
            [new TargetNameIncludesAnyOfTheseWords(["Devona"]), new TargetIsAlive({invert:true})],
            [new IncrementMyState("no")],
            true,
            1000*60,
            true
        );
        

        const beats:AiBeat[] = [punishTheguilty,extractMeaningFromObject];
        const states = [new FortitudeTwin(room,0,0)];

        super(room,"Neville", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[MATH]],sprite,
        "Neville is staring into space.", beats, states);
    }
}   

export class FortitudeTwin extends Quotidian{
    lore = "He seeks only retribution for the death of his twin. It's not his fault he's so lost. He's careful and quiet and doing his best. He can't let himself see. He can't let himself think. He can't let himself realize just what he has lost. "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 10;
    breached = true;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };

        /*
            Neville has absolutely no idea where the killer is, but is careful and deliberate while looking for them.
              He won't kill anyoen except the one who harmed his twin.

              It might take him forever, but he has all the stamina he needs to be patient.
        */

        const hunt = new AiBeat(
            "Fortitudinous Punishing Twin: Hunt for the Killer of Your Twin",
            [`The ${SUBJECTSTRING} is aimlessly searching for the Killer of Devona. You don't get the impression that it's very good at it. It seems to just kinda be moving around at random and sqwawking in frustration.  It never gets tired though...`],
            [new TargetIsTheKillerOfBlorboNamed("Devona"),new TargetIsAlive(),new RandomTarget(0.5)],
            [new MoveRandomly(), new DeploySass("!?")],
            true,
            1000*60
        );

        const mourn = new AiBeat(
            "Fortitudinous Punishing Twin: Mourn your Twin",
            [`The ${SUBJECTSTRING} paws gently at ${TARGETSTRING}... It looks so sad...`],
            [new TargetNameIncludesAnyOfTheseWords(["Devona"]), new TargetIsWithinRadiusOfSelf(10)],
            [new DeploySass(":(")],
            true,
            1000*60
        );

        const visitGrave = new AiBeat(
            "Fortitudinous Punishing Twin: Mourn your Twin",
            [`The ${SUBJECTSTRING} whimpers with sadness... and begins making a bee line back to the ${TARGETSTRING}`],
            [new TargetNameIncludesAnyOfTheseWords(["Devona"]), new TargetIsWithinRadiusOfSelf(5,{singleTarget:true, invert: true}),new RandomTarget(0.5)],
            [new FollowObject()],
            true,
            1000*60
        );
        
        const kill = new AiBeat(
            "Fortitudinous Punishing Twin: Punish the Killer of Your Twin",
            [`The torso of the ${SUBJECTSTRING} opens with a meaty squelch and crunches down on the ${TARGETSTRING}. Shreds of them are all that remain. The Fortitudinous Punishing Twin appears to be satisfied.`],
            [new TargetIsTheKillerOfBlorboNamed("Devona"), new TargetIsWithinRadiusOfSelf(5)],
            [new MeleeKill("being eaten by the Fortitudinous Punishing Twin"), new DeploySass(":)")],
            true,
            1000*60,
            true
        );

        const unbreach = new AiBeat(
            "Fortitudinous Punishing Twin: Relax",
            [`The Fortitudinous Punishing Twin withers into itself, and Neville emerges once more. He falls onto his knees, tears streaming down his face. His twin is dead, and nothing will ever bring her back. But at least she is avenged.   `],
            [new TargetIsTheKillerOfBlorboNamed("Devona"), new TargetIsAlive({invert:true})],
            [new IncrementMyState("no")],
            true,
            1000*60
        );
        

        const beats:AiBeat[] = [kill,mourn,hunt,visitGrave,  unbreach];

        super(room,"Fortitudinous Punishing Twin", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[MATH]],sprite,
        "The Fortitude Punishing Twin is hunting.", beats);
    }
}   
