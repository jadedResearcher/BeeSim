import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { ENDINGS, KILLING, QUESTING, LONELY } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { FollowObject } from "../Actions/FollowObject";
import { MeleeKill } from "../Actions/MeleeKill";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { Quotidian, Direction, FEMALE, blorboSpriteLocation } from "./Quotidian";
import { Relationship } from "./Relationship";



export class Camille extends Quotidian{
    lore = "Parker has said her soul has the shape of an Irish Wolfound.  Something friendly and big that does not understand why you find it intimidating. It thinks it is a lapdog, it just wants to be friends. Unless you are for killing. Then you are dead. Very, very, quickly dead.";
    relationshipMap = new Map<string, Relationship>([
        ["Ria,Match", new Relationship("Ria,Match",1000000,"I really admire her dedication.","...","She's the smartest person I've ever met and just lights up  a room.","She's so cute when she's really excited about something she's talking about.","I can't imagine a life without her in some capacity.",true,true,false)]
        ,["Peewee Puppet,Glitch of Doom", new Relationship("Peewee Puppet,Glitch of Doom",-1000,"I have to admit, he never gives up.","I really wish he'd stop trying to destroy the Universe. That's probably why he's so Doomed.","I kind of feel bad for him. It's not his fault he's tied up like this.","<3","I never thought we'd end up like this.",false,false,false)]

    ]); //(keyed by array of all known names, csv)
    //camille just likes making friends :), absolute shit attachment stat
    likeMultiplier  = 3.0; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 0.3; //(effects how quickly they grow to dislike ppl in general)
    gender = FEMALE;
    instablityRate = 113; //camille is a glass canon of endurance
    stabilityLevel = 1113;
    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    fortitude = 4;
    prudence = 3;
    temperance = 1;
    judgement = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:`${blorboSpriteLocation()}/the_end2.png`,width:56,height:100},

        };
        const start = "<span class='asl'>"
        const end = "</span>"

         const BreathOnObject = new AiBeat(
            "Camille: Be Friends",
            [`Camille looms over ${TARGETSTRING}. She says '${start}Where are we going?${end}'.`,`Camille looms over ${TARGETSTRING}. She says '${start}Hello!${end}'.`,`Camille looms over ${TARGETSTRING}. She says ':3'.`,`Camille looms over ${TARGETSTRING}. She says '${start}Friend!${end}'.`],
            [new TargetIsBlorboOrBox(),new TargetIsAlive(), new TargetIsWithinRadiusOfSelf(5, {singleTarget:true})],
            [new DeploySass(":)")],
            true,
            2*60*1000
        );

        //she doesn't tend to change her mind
        const ObesssOverBlorbo = new AiBeat(
            "Camille: Make Friends",
            [`Camille locks eyes with ${TARGETSTRING}.`],
            [new TargetIsBlorboOrBox(), new TargetIsAlive(),new RandomTarget(.5, {singleTarget:true})],
            [new FollowObject()]
        );
        const beats:AiBeat[] = [ObesssOverBlorbo,BreathOnObject];
        const states = [new End(room,0,0)];

        super(room,"Camille", x,y,[all_themes[ENDINGS],all_themes[KILLING],all_themes[QUESTING],all_themes[LONELY]],sprite,"The End Comes For Us All", beats, states);
    }

    die = (causeOfDeath: string, killer: Quotidian) => {
        console.warn(`JR NOTE: whoops. Looks like Camille...lost her head! 🥁 `);
        this.incrementState();
        this.breaching  = true;
        this.image.classList.remove("shake");//she's not breathing anymore
        killer.sufferConsequencesForKilling(this);

    }
}

/*
call it the universe
or call it fate
call it whatever you want
but she is its Knight, and the tool it uses to destroy those it has no use for
the immune system of the Echidna
*/
export class End extends Quotidian{
    lore = "There is nothing left of the smiling girl. Just a husk of a corpse built for one purpose.";

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;
    likeMultiplier  = 0.0; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 0.0; //(effects how quickly they grow to dislike ppl in general)
  

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"theend.png",width:56,height:100},

        };

         const KillObject = new AiBeat(
            "End: End Them",
            [`The time has come. It was always going to end this way. All who are born die. ${TARGETSTRING} meets their end with one clean cut.`],
            [new TargetIsBlorboOrBox(),new TargetIsAlive(), new TargetIsWithinRadiusOfSelf(5, {singleTarget:true})],
            [new MeleeKill("being alive")],
            true,
            2*60*1000
            ,true
        );

        //she doesn't tend to change her mind
        const ObesssOverBlorbo = new AiBeat(
            "End: Pick Target",
            [`The shambling corpse of a long dead warrior begins calmly walking towards ${TARGETSTRING}.`],
            [new TargetIsBlorboOrBox(), new TargetIsAlive(),new RandomTarget(.5, {singleTarget:true})],
            [new FollowObject()]
        );
        const beats:AiBeat[] = [ObesssOverBlorbo,KillObject];
        super(room,"End", x,y,[all_themes[ENDINGS],all_themes[KILLING],all_themes[QUESTING],all_themes[LONELY]],sprite,"The End Comes For Us All", beats);
    }

    die = (causeOfDeath: string) => {
        console.warn(`JR NOTE: did you actually think Death could die? That the Coffin Spawn itself could end???`);
    }
}
