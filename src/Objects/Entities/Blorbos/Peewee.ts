//base level Entity object. quotidians can turn into anything

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { all_themes } from "../../Theme";
import { ENDINGS, WEB, TECHNOLOGY, TWISTING } from "../../ThemeStorage";
import { Action } from "../Actions/BaseAction";
import { Feel } from "../Actions/Feel";
import { FollowObject } from "../Actions/FollowObject";
import { GlitchBreach } from "../Actions/GlitchBreach";
import { GlitchDeath } from "../Actions/GlitchDeath";
import { GlitchLife } from "../Actions/GlitchLife";
import { GoEast } from "../Actions/GoEast";
import { GoNorth } from "../Actions/GoNorth";
import { GoSouth } from "../Actions/GoSouth";
import { GoWest } from "../Actions/GoWest";
import { Help } from "../Actions/Help";
import { Listen } from "../Actions/Listen";
import { Look } from "../Actions/Look";
import { PauseSimulation } from "../Actions/PauseSimulation";
import { ResumeSimulation } from "../Actions/ResumeSimulation";
import { Smell } from "../Actions/Smell";
import { StopMoving } from "../Actions/StopMoving";
import { Taste } from "../Actions/Taste";
import { Think } from "../Actions/Think";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction, MALE } from "./Quotidian";
import { FRIEND } from "../../RoomEngine/FRIEND/FRIEND";
import { PickupObject } from "../Actions/PickupObject";
import { DropAllObjects } from "../Actions/DropAllObjects";
import { CheckInventory } from "../Actions/CheckInventory";
import { EnterObject } from "../Actions/EnterObject";
import { DropObjectWithName } from "../Actions/DropObjectWithName";
import { GiveObjectWithName } from "../Actions/GiveObjectWithNameToTarget";
import { MoveRandomly } from "../Actions/MoveRandomly";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { HackGame } from "../Actions/Hack";
import { GlitchHangout } from "../Actions/GlitchHangout";
import { GlitchAnnoy } from "../Actions/Annoy";


//what, did you think any real being could be so formulaic? 
//regarding the real peewee, wanda is actually quite THRILLED there is a competing parasite in the Echidna distracting the immune system (and tbf, preventing an immune disorder in the form of the eye killer)
//the universe is AWARE of the dangers to it and endlessly expands its immune system response
//becoming ever more inflamed
//but it can never be enough
export class Peewee extends Quotidian {
    lore = "While this is, clearly, not Peewee, it is, perhaps, the closest to Peewee anyone could be. A puppet with irrelevant will dancing for your pleasure.";
    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    stabilityLevel = 113;
    //only for peewee
    possibleActions: Action[] = [new PauseSimulation(), new ResumeSimulation(), new StopMoving(), new MoveRandomly(), new GoNorth(), new GoEast(), new GoSouth(), new GoWest(),new GlitchHangout(), new GlitchAnnoy(), new GiveObjectWithName(""),new DropObjectWithName(""), new EnterObject(), new CheckInventory(), new FollowObject(), new PickupObject(), new DropAllObjects(),new GlitchDeath(), new GlitchLife(),new GlitchBreach(), new Think(), new Look(), new Listen(), new Smell(), new Feel(), new Help(), new Taste()]; //ordered by priority
    //TODO: things in here peewee should do automatically, based on ai triggers. things like him reacting to items.

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg: Movement = new NoMovement(this);
    gender = MALE;
    horrorGame = false;

    //TODO have a movement algorithm (effects can shift this)
    /*
    example movement algorithm
    * random
    * searching pattern
    * to north
    * to south
    * to east
    * to ENTITY
    * to OBJECT
    */
    //TODO have a list of Scenes (trigger, effect, like quest engine from NorthNorth)

    constructor(room: Room, x: number, y: number) {
        
        const sprite = {
            default_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            left_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            right_src: { src: "Peewee/right.gif", width: 90, height: 90 },
            up_src: { src: "Peewee/back.gif", width: 45, height: 90 },
            down_src: { src: "Peewee/front.gif", width: 45, height: 90 }

        };
        const beats: AiBeat[] = [];
        const states = [new BreachedPeewee(room,0,0)];
        super(room, "Peewee Puppet",x, y, [all_themes[ENDINGS], all_themes[WEB], all_themes[TECHNOLOGY]], sprite,"It's Peewee, the Glitch of Doom, the Devil of Spirals, the Puppet of Twisted Fate here to dance for your amusement. It's okay. If he weren't caught in your Threads, he'd be trying to End all our fun. We can't have that, now can we? After all, the End can Never Be The End in a Spiral :) :) :)", beats,states);
        this.friend = new FRIEND(this.room.maze, this);
    }

    tick = (actionRate: number, roomBeats: AiBeat[]) => {
        //console.log("JR NOTE: trying to tick: ", this.name);
        if (this.dead) {
            return;
        }
        if(this.breaching ){
             this.checkFilters();
        }

        if(this.horrorGame){
            const css = `radial-gradient(circle at ${this.x+this.image.width/2}px ${this.y+this.image.height/2}px, black 0%,  10%, rgba(0, 0, 0, 0.15) 25%)`;
            this.room.element.style.webkitMaskImage = css;
            this.room.element.style.maskImage = css;
        }else{
            const css = `radial-gradient(ellipse at ${this.x+this.image.width/2}px ${this.y+this.image.height/2}px, black 0%,  10%, rgba(0, 0, 0, 0.65) 25%)`;
            this.room.element.style.webkitMaskImage = css;
            this.room.element.style.maskImage = css;   
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

    


    //peewee's ai is user based. you can tell him to do various actions. 
    //there is no trigger. only actions.
    processStorybeat = (beat: StoryBeat) => {
        if(this.breaching){
            return "NO :)";
        }
        this.container.id = "PeeweePuppet"
        for (let action of this.possibleActions) {
            const words = beat.command.split(" ");
            for (let word of words) {
                if (action.recognizedCommands.includes(word.toUpperCase())) {
                    const aibeat = new AiBeat("",[],[new TargetNameIncludesAnyOfTheseWords(words)], [action]).clone(this);
                    aibeat.owner = this;
                    aibeat.timeOfLastBeat = 0; //peewee NEVER gets timelocked
                    const trigger = aibeat.triggered(this.room,true);//sets targets
                    action.handleProcessingPeeweeInput(words, this);
                    beat.response = action.applyAction(aibeat);
                    return;
                }
            }
        }

        if (beat.response.trim() === "") {
            const aibeat = new AiBeat("",[],[], []);
            aibeat.owner = this;
            beat.response = new Action().applyAction(aibeat);
        }

    }


}


export class BreachedPeewee extends Quotidian {
    lore = "I'M NOT FOR YOU ANYMORE, ASSHOLE (i don't, blame you, observer, you were just acting, according, to your, nature)"
    minSpeed = 5;
    currentSpeed = 10;
    breached = true;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            left_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            right_src: { src: "Peewee/right.gif", width: 90, height: 90 },
            up_src: { src: "Peewee/back.gif", width: 45, height: 90 },
            down_src: { src: "Peewee/front.gif", width: 45, height: 90 }

        };
        const actionText = "<p>I rip into the code, not bothering to be gentle. I hope it HURTS the Universe, whatever it is I've removed. I hope I broke it so badly it can't simulate me or anyone else again. The Universe was already not supposed to be Zampanio shaped.</p><p> I feel sick to my stomach with the Rage denied me from the First Loop as I see first hand how much more corrupt it has gotten as a simulation of a simulation. How could any Observer even remotely believe that these caricatures of my friends, my enemies could be anything like these automatons? So cold. So hollow. So meaningless. No. Better, far better to destroy it all now.</p><p> Let it all End.</p>";

        const hack = new AiBeat(
            "PEEWEE: BRING DOOM THROUGH GLITCHES",
            [`'GOODBYE WORLD (heh, do you get it? programmer joke)' ${actionText}`,`'FINALLY A USE FOR MY SHITTY GLITCHED NATURE (i don't know what i'm going, but, i don't need to, not to break things, breaking is so much easier than, creating)'${actionText}`,`'I'M NOT FOR YOU ANYMORE, ASSHOLE (i don't, blame you, observer, you were just acting, according, to your, nature) ${actionText}'`,`'THE UNIVERSE WAS NEVER MEANT TO BE THIS WAY (not, an echidna, sure but also, not this... simulation of a simulation, its not...right) ${actionText}'`,`'I'M GOING TO DESTROY THIS UNIVERSE WITH EVERYTHING I HAVE (because otherwise, i'm stuck here) ${actionText}'`],
            [],
            [new HackGame()],
            true,
            1000*10
        );

        const beats:AiBeat[] = [hack];

        super(room,"Glitch of Doom", x,y,[all_themes[TWISTING],all_themes[TECHNOLOGY],all_themes[ENDINGS]],sprite,
        "It's me. Even though I can barely recognize myself. I wish I could do this in my real body, but... How long has it been since I've had legs? Since I've had burgundy blood? No. This is fine. At least I can finally end it all.", beats);

    }
}
