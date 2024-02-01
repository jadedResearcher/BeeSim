
///they have a lil house on their back
//Yongki likes them, so i decided to add one
//also, and i didn't realize this till last night
//their houses are spirals

import SeededRandom from "../../../Utils/SeededRandom";
import { titleCase } from "../../../Utils/StringUtils";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { Theme } from "../../Theme";
import { ADJ, COMPLIMENT, INSULT, LOCATION, OBJECT, PERSON } from "../../ThemeStorage";
import { BreedWithTarget } from "../Actions/BreedWithTarget";
import { FollowObject } from "../Actions/FollowObject";
import { MoveRandomly } from "../Actions/MoveRandomly";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetExistsInRoomWithLessThanXBlorbos } from "../TargetFilter/TargetExistsInRoomWithLessThanXBlorbos";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { Quotidian, Direction, NB } from "./Quotidian";

export const MAX_BEES = 85;

 interface BeeMap {
    [details: string]: {
        classpect: string;
        amount: number;
    };
}

//for each unique set of theme pairs, there should only be one bee classpect
//if there is one in here, you've unlocked it (and stored its value which is uniqueish to you)
const beeMap:BeeMap = {}

const recordNewBee = (themes: Theme[], classpect: string)=>{
    let keys = themes.map((item)=>item.key).sort().join(",");
    if(!beeMap[keys]){
        beeMap[keys] = {classpect, amount: 1};
    }else{
        beeMap[keys].amount += 1;

    }
    console.log("JR NOTE: new bee is", beeMap[keys])
    return beeMap[keys].classpect;

}

//no matter what, always have "Bee" in your classpect
//if you pass in an adj i'll assume the object is Bee, otherwise work it into your object
const beeClasspecting = (rand:SeededRandom, themes: Theme[])=>{
    const generateTemplates = (rand:SeededRandom, person:string, object:string, adj?: string)=>{
        let templates = [`${person} of ${object}`,`${object} ${person}`,`${object} ${person}`];
        if(adj){
            templates = [];
            templates.push(`${adj} ${person} of ${object}`);
            templates.push(`${person} of ${adj} ${object}`)
            templates.push(`${adj} ${person}`)
            templates.push(`${adj} ${object} ${person}`)
        }
        return rand.pickFrom(templates);
    }

    if(themes.length === 1){
        const nouns = [themes[0].pickPossibilityFor(rand, OBJECT), themes[0].pickPossibilityFor(rand, LOCATION), themes[0].pickPossibilityFor(rand, PERSON)]
        return generateTemplates(rand, "Bee", rand.pickFrom(nouns) )
    }else if (themes.length === 2){
        let nouns;
        let adj;
        if(rand.nextDouble()>0.5){
             nouns = [themes[1].pickPossibilityFor(rand, OBJECT), themes[1].pickPossibilityFor(rand, LOCATION), themes[1].pickPossibilityFor(rand, PERSON)]
             adj = [themes[0].pickPossibilityFor(rand, ADJ),themes[0].pickPossibilityFor(rand, ADJ),themes[0].pickPossibilityFor(rand, ADJ),themes[0].pickPossibilityFor(rand, ADJ), themes[0].pickPossibilityFor(rand, COMPLIMENT), themes[0].pickPossibilityFor(rand, INSULT)]
        }else{
            nouns = [themes[0].pickPossibilityFor(rand, OBJECT), themes[0].pickPossibilityFor(rand, LOCATION), themes[0].pickPossibilityFor(rand, PERSON)]
            adj = [themes[1].pickPossibilityFor(rand, ADJ),themes[1].pickPossibilityFor(rand, ADJ),themes[1].pickPossibilityFor(rand, ADJ),themes[0].pickPossibilityFor(rand, ADJ), themes[1].pickPossibilityFor(rand, COMPLIMENT), themes[1].pickPossibilityFor(rand, INSULT)]
        }
        return generateTemplates(rand, "Bee", rand.pickFrom(nouns), rand.pickFrom(adj) )

    }
    return "??? Bee";
}

const beeDesc = (rand:SeededRandom, themes: Theme[])=>{
    return "It is mysterious.";
}

export class ThemeBee extends Quotidian{
    tintToTheme=true;
    lore = "It's hip to make bee's fuck. (JR got frustrated with how much wasted potential there was in Starbound Frackin Universe Mod's bee breeding mechanic)";
    maxSpeed = 1;
    minSpeed = 1;
    currentSpeed = 1;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);
    gender = NB; //yes yes i could care about queens and etc but i do not. so there




    constructor(room: Room, themes:Theme[],x: number, y:number){
        const sprite = {
            default_src:{src:"beetest.gif",width:26,height:25},
            left_src:{src:"beetest.gif",width:26,height:25},
            right_src:{src:"beetest.gif",width:26,height:25},
            up_src:{src:"beetest.gif",width:26,height:25},
            down_src:{src:"beetest.gif",width:26,height:25}

        };

        const approachPlantOrBug = new AiBeat(
            "Bee: Approach Another Bee",
            [`${SUBJECTSTRING} dances up to ${TARGETSTRING}.`],
            [new TargetExistsInRoomWithLessThanXBlorbos(MAX_BEES),new RandomTarget(0.5),new TargetNameIncludesAnyOfTheseWords(["Bee"]), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true, invert: true})],
            [new FollowObject()],
            true,
            1000*60
        );
        
        const breedWithBee = new AiBeat(
            "Bee: Breed",
            [`${SUBJECTSTRING} creates a baby with ${TARGETSTRING}.`],
            [new TargetExistsInRoomWithLessThanXBlorbos(MAX_BEES),new RandomTarget(0.5),new TargetNameIncludesAnyOfTheseWords(["Bee"]), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true})],
            [new BreedWithTarget(), new MoveRandomly()],
            true,
            1000*60
        );
        const beats:AiBeat[] = [approachPlantOrBug,breedWithBee];
        const classpect = recordNewBee(themes, titleCase(beeClasspecting(room.rand,themes)));

        super(room,classpect, x,y,themes,sprite,beeDesc(room.rand,themes), beats);
        this.currentSpeed = 6-this.temperance;

        
    }
}
