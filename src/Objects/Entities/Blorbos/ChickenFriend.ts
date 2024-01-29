
///they have a lil house on their back
//Yongki likes them, so i decided to add one
//also, and i didn't realize this till last night
//their houses are spirals

import { Movement } from "../../MovementAlgs/BaseMovement";
import { SteadyMovement } from "../../MovementAlgs/SteadyMovement";
import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { BUGS, CRAFTING, PLANTS } from "../../ThemeStorage";
import { DestroyInventoryObjectWithThemes } from "../Actions/DestroyObjectInInventoryWithThemes";
import { FollowObject } from "../Actions/FollowObject";
import { PickupObject } from "../Actions/PickupObject";
import { SpawnObjectAtFeet } from "../Actions/SpawnObjectAtFeet";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { TargetHasObjectWithTheme } from "../TargetFilter/TargetHasObjectWithTheme";
import { TargetHasTheme } from "../TargetFilter/TargetHasTheme";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { Quotidian, Direction, FEMALE } from "./Quotidian";


//which came first, the chicken or the egg?
export class Chicken extends Quotidian{
    lore = "Why does the Eye Kliler love eggs? It's simple. Because when everything was scary and dangerous, someone made her eggs. Yes, he was at knife point at the time. But the point is he DID and he did them well and she never forgot. ";
    maxSpeed = 10;
    minSpeed = 5;
    currentSpeed = 5;
    gender = FEMALE;


    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new SteadyMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"chicken_left.gif",width:33,height:28},
            left_src:{src:"chicken_left.gif",width:33,height:28},
            right_src:{src:"chicken_right.gif",width:33,height:28},
            up_src:{src:"chicken_up.gif",width:29,height:28},
            down_src:{src:"chicken_down.gif",width:29,height:28}

        };

        const egg = new PhysicalObject(room, "Egg", 0,0, 13,19, [], 0, "images/Walkabout/Objects/TopFloorObjects/egg.png", "It's a pretty basic chicken egg.");

        const eatPlant = new AiBeat(
            "Chicken: Eat Plant",
            [`The chicken eats the ${TARGETSTRING}.`],
            [new TargetHasObjectWithTheme([all_themes[PLANTS]], {kMode:true})],
            [new DestroyInventoryObjectWithThemes([all_themes[PLANTS]]), new SpawnObjectAtFeet(egg)],
            true,
            1000*60
        );
        const eatBug = new AiBeat(
            "Chicken: Eat Bug",
            [`The chicken eats the ${TARGETSTRING}.`],
            [new TargetHasObjectWithTheme([all_themes[BUGS]], {kMode:true})],
            [new DestroyInventoryObjectWithThemes([all_themes[BUGS]]), new SpawnObjectAtFeet(egg)],
            true,
            1000*60
        );
        const approachPlantOrBug = new AiBeat(
            "Chicken: Investigate Food",
            [`The chicken's beady little eyes focus on the ${TARGETSTRING}.`],
            [new TargetHasTheme([all_themes[BUGS],all_themes[PLANTS]],{singleTarget:true}),new TargetIsWithinRadiusOfSelf(5,{invert: true})],
            [new FollowObject()],
            true,
            1000*60
        );
        const pickupPlantOrBug = new AiBeat(
            "Chicken: Peck Food",
            [`The chicken pecks at the ${TARGETSTRING}.`],
            [new TargetHasTheme([all_themes[BUGS],all_themes[PLANTS]],{singleTarget:true}),new TargetIsWithinRadiusOfSelf(5)],
            [new PickupObject()],
            true,
            1000*60,
            true
        );

        const beats:AiBeat[] = [
            eatBug,
            eatPlant,
            pickupPlantOrBug,
            approachPlantOrBug
        ];
        super(room,"Chicken Friend", x,y,[all_themes[CRAFTING]],sprite,"They make eggs. Eggs are important.", beats);
    }
}
