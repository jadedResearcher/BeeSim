//just leave her alone with her egg

import { createElementWithIdAndParent } from "../../../Utils/misc";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, ANGELS, FILTERS } from "../../ThemeStorage";
import { AddThemeToRoom } from "../Actions/AddThemeToRoom";
import { FollowObject } from "../Actions/FollowObject";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { MeleeKill } from "../Actions/MeleeKill";
import { PickupObject } from "../Actions/PickupObject";
import { SpawnObjectFromThemeUnderFloorAtFeet } from "../Actions/SpawnObjectFromThemeUnderFloorAtFeet";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetExistsInAWorldWhereBlorboNamedXIsAlive } from "../TargetFilter/TargetExistsInAWorldWhereBlorboWithNameIsAlive";
import { TargetHasObjectWithName } from "../TargetFilter/TargetHasObjectWithName";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction, FEMALE } from "./Quotidian";



export class EyeKiller extends Quotidian {
    lore = "Parker has said her soul is in the shape of a ram. He says there is a joke in there, about time and sheep. (in the West, sheep are sacrificed to travel in time) But the important point is that the Killer's soul is that of prey, that of something CERTAIN you will KILL it unless she rams her blade deep into your heart first. They say horses live in silent hill, but sheep must, too.";
    maxSpeed = 50;
    minSpeed = 5;
    eyeImageContainer = document.createElement("div");

    instablityRate = 113; //if something goes wrong, how much does it effect their stability level?

    gender = FEMALE;
    likeMultiplier = 0.5; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 3.3;
    romanticFOdds = 0.0; //likes ladies more than others
    romanticMOdds = 0.0;
    romanticNBOdds = 0.0;

    fortitude = 1;
    prudence = 5;
    temperance = 3;
    judgement = 3;

    currentSpeed = 5;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg: Movement = new NoMovement(this);

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: "KillerDown.gif", width: 50, height: 50 },
            left_src: { src: "KillerLeft.gif", width: 50, height: 50 },
            right_src: { src: "KillerRight.gif", width: 50, height: 50 },
            up_src: { src: "KillerUp.gif", width: 50, height: 50 },
            down_src: { src: "KillerDown.gif", width: 50, height: 50 }

        };

        super(room, "Eye Killer", x, y, [all_themes[HUNTING], all_themes[KILLING], all_themes[FAMILY], all_themes[DARKNESS]], sprite, "It's the Eye Killer! I'd leave her alone!", []);
        this.setupAI();
        this.breaching = true;
    }

    customShitForRendering = ()=>{
        this.eyeImageContainer.style.transform = `translate(${this.x - this.original_x}px,${this.y - this.original_y}px)`;
        this.eyeImageContainer.setAttribute("currentLocation",`${this.x}, ${this.y}`);
    }

    //the eye killer has a single glowing eye
    customSyncCode = () => {
        //nothing for default quotidians
        if (!this.eyeImageContainer.parentElement) {
            const spookyEyesContainer = document.querySelector("#current-room-for-spooky-eyes")
            if (spookyEyesContainer) {
                spookyEyesContainer.append(this.eyeImageContainer);
                this.eyeImageContainer.style.position = "absolute";
                this.eyeImageContainer.style.top = `${this.original_y}px`;
                this.eyeImageContainer.style.left = `${this.original_x}px`;
                this.eyeImageContainer.style.zIndex = "100";
                this.eyeImageContainer.setAttribute("inspiration","Vampire Survivors")
                const eyeImage = createElementWithIdAndParent("img", this.eyeImageContainer,undefined,"shake")
                if(eyeImage){
                    (eyeImage as HTMLImageElement).src = "images/Walkabout/Sprites/KillerDownEye.gif";
                    eyeImage.style.width = "50px";

                }
            }
        }
        if (this.direction === Direction.DOWN) {
            this.eyeImageContainer.style.display = "block";
        } else {
            this.eyeImageContainer.style.display = "none";
        }


    }

    setupAI = async () => {

        //hunting time
        const pickATarget = new AiBeat(
            "Killer: Hunt",
            [`The Eye Killer begins hunting ${TARGETSTRING}.`],
            [new TargetIsBlorboOrBox(), new TargetIsAlive(), new RandomTarget(.5, { singleTarget: true })],
            [new FollowObject()],
            true,
            1000 * 60
        );

        const approachEgg = new AiBeat(
            "Killer: Go Egg",
            [`The Eye Killer sees the ${TARGETSTRING}.`],
            [new TargetNameIncludesAnyOfTheseWords(["Egg"], { singleTarget: true }), new TargetIsWithinRadiusOfSelf(5, { invert: true })],
            [new FollowObject()],
            true,
            1000 * 60
        );
        const pickupEgg = new AiBeat(
            "Killer: Take Egg",

            [`The Eye Killer picks up the ${TARGETSTRING}.`],
            [new TargetNameIncludesAnyOfTheseWords(["Egg"]), new TargetIsWithinRadiusOfSelf(5)],
            [new PickupObject()],
            true,
            1000 * 60,
            true
        );

        //new IHaveObjectWithName(["Egg"], {invert: true}),new TargetHasObjectWithName(["Egg"], {invert: true}),
        const killUnlessYouHaveAnEggOrTheyDo = new AiBeat(
            "Killer: Kill",
            [`The Eye Killer brutally stabs  ${TARGETSTRING} over and over until they stop twitching.`],
            [new IHaveObjectWithName(["Egg"], { invert: true }), new TargetHasObjectWithName(["Egg"], { invert: true }), new TargetIsBlorboOrBox(), new TargetIsAlive(), new TargetIsWithinRadiusOfSelf(5, { singleTarget: true })],
            [new MeleeKill("brutally stabs over and over"), new AddThemeToRoom(KILLING), new SpawnObjectFromThemeUnderFloorAtFeet(KILLING, `${TARGETSTRING}'s blood`, `Something very upsetting happened here to ${TARGETSTRING}.`)],
            true,
            30 * 1000,
            true
        );

        const desecrateCorpse = new AiBeat(
            "Killer: Do Art",
            [`The Eye Killer appears to creating some sort of art piece out of what remains of ${TARGETSTRING}.`],
            [new IHaveObjectWithName(["Egg"], { invert: true }), new TargetHasObjectWithName(["Egg"], { invert: true }), new TargetIsBlorboOrBox(), new TargetIsAlive({ invert: true }), new TargetIsWithinRadiusOfSelf(5, { singleTarget: true })],
            [new AddThemeToRoom(KILLING), new SpawnObjectFromThemeUnderFloorAtFeet(KILLING, `${TARGETSTRING}'s blood`, `Something very upsetting happened here to ${TARGETSTRING}.`)],
            true,
            30 * 1000
        );

        const beats: AiBeat[] = [
            approachEgg,
            pickupEgg,
            killUnlessYouHaveAnEggOrTheyDo,
            desecrateCorpse,
            pickATarget
        ];
        this.makeBeatsMyOwn(beats);
    }

    checkFilters = () => {
        //const dark_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  10%, rgba(0, 0, 0, 0.15) 25%);`;
        this.filterStringAppliedToRoom = "";
        for (let theme of this.themes) {
            const option = theme.pickPossibilityFor(this.rand, FILTERS);
            if (!option.includes("ERROR")) {
                this.filterStringAppliedToRoom += option;
            }
        }
        if (this.room.peewee) {
            this.room.peewee.horrorGame = true;
        }
        this.room.applyFilter(this.filterStringAppliedToRoom); //do not overwrite
    }

}


export class Innocent extends Quotidian {

    maxSpeed = 50;
    minSpeed = 5;
    gender = FEMALE;

    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg: Movement = new RandomMovement(this);
    lore = "She should not be here. She is not part of the Loop.  The Eye Killer made sure of it. And yet. If the Killer falls...the Innocent is the Killer. In the end.";

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: "InnocentLeft.gif", width: 50, height: 50 },
            left_src: { src: "InnocentLeft.gif", width: 50, height: 50 },
            right_src: { src: "InnocentRight.gif", width: 50, height: 50 },
            up_src: { src: "Innocent_upwards.gif", width: 50, height: 50 },
            down_src: { src: "innocentforward.gif", width: 50, height: 50 }

        };


        const theTimeLineMustAlwaysHaveOne = new AiBeat(
            "Innocent: Accept Your Fate",
            [`The Innocent screams as she's wreathed in seething shadows.  For a full minute barely visible clocks tick out the time.  When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. `],
            [new TargetExistsInAWorldWhereBlorboNamedXIsAlive("Eye Killer", { invert: true })],
            [new IncrementMyState("is covered in seething shadows for a full minute as barely visible clocks swirl and tick. When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. ")],
            true,
            1000 * 60
        );

        const beats: AiBeat[] = [theTimeLineMustAlwaysHaveOne];
        const states = [new EyeKiller(room, 0, 0)];
        super(room, "Innocent", x, y, [all_themes[FAMILY], all_themes[ANGELS]], sprite, "Wow, she seems totally innocent!", beats, states);
    }

    checkFilters = () => {
        //const dark_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  10%, rgba(0, 0, 0, 0.15) 25%);`;
        this.filterStringAppliedToRoom = "";
        for (let theme of this.themes) {
            const option = theme.pickPossibilityFor(this.rand, FILTERS);
            if (!option.includes("ERROR")) {
                this.filterStringAppliedToRoom += option;
            }
        }
        if (this.room.peewee) {
            this.room.peewee.horrorGame = true;
        }
        this.room.applyFilter(this.filterStringAppliedToRoom); //do not overwrite
    }
}   