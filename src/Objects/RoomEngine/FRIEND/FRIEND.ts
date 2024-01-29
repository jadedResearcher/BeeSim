import { passwords } from "../../../Secrets/PasswordStorage";
import { removeItemOnce } from "../../../Utils/ArrayUtils";
import { pickFrom } from "../../../Utils/NonSeededRandUtils";
import { Quotidian } from "../../Entities/Blorbos/Quotidian";
import { AiBeat } from "../../Entities/StoryBeats/BaseBeat";
import { FriendlyAiBeat } from "../../Entities/StoryBeats/FriendlyAiBeat";
import { TargetHasObjectWithName } from "../../Entities/TargetFilter/TargetHasObjectWithName";
import { TargetHasObjectWithTheme } from "../../Entities/TargetFilter/TargetHasObjectWithTheme";
import { TargetIsAlive } from "../../Entities/TargetFilter/TargetIsAlive";
import { TargetIsBreeching } from "../../Entities/TargetFilter/TargetIsBreaching";
import { TargetNearObjectWithName } from "../../Entities/TargetFilter/TargetIsNearObjectWithName";
import { TargetNameIncludesAnyOfTheseWords } from "../../Entities/TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { PhysicalObject } from "../../PhysicalObject";
import { all_themes } from "../../Theme";
import { BUGS, PLANTS } from "../../ThemeStorage";
import { Maze } from "../Maze";
import { StoryBeat } from "../StoryBeat";

/*
FRIEND gives you one quest at a time.

if you don't currently have a quest, after a minute, FRIEND will give you one.

the quests FRIEND gives you are NOT procedural, they are designed to pursue very specific purposes. 

however, you do get them in a random order.

FRIEND's quests are a bit like normal ai. 

FRIEND has a target filter for the world, things like "target is named Eye Killer" and "target has EGG in inventory"

FRIEND also has an ACTION associated with this filter, things like "custom story beat" that has a command, a response, and a TRUTH

FRIEND is the false face of Truth, become just a bit more real. FRIEND is entirely separate from Truth, but Truth is still tagging along

if there are no more quests from FRIEND, it should mention that fact.

PROBLEM, both target filters and actions except a physical object subject. FRIEND is not a physical object.
*/
export class FRIEND{

    //well, no, technically not ITS body, but good enough for Watching this world and borrowing it's knowledge, wouldnt you say?
    physicalBody: Quotidian;
    maze: Maze;
    currentQuest?: FriendlyAiBeat;
    quests: FriendlyAiBeat[] = [];
    start = `<img style="display: block; margin-left: auto; margin-right: auto; width: 300px;"src='images/Walkabout/Sprites/FRIEND.png'></img><span style="font-family: Courier New">`;
    end = "</span>";
    timeOfLastQuest = new Date().getTime();
    gigglesnortOptions:string[] = [];


    constructor(maze: Maze,physicalBody: Quotidian){
        this.maze = maze;
        this.physicalBody = physicalBody; //go ahead and borrow someone elese's it'll be fine (srsly tho in order to interact with the ai engine you need a physical body and FRIEND just does not have one , nor should it)
        this.init();
    }

    createGigglesnortOptions  = ()=>{
        if(this.maze.peewee){
            this.gigglesnortOptions = this.maze.peewee.possibleActions.filter((i)=>!i.hidden).map((i)=>`I think PEEWEE can ${i.recognizedCommands[0]}`);
        }
        this.gigglesnortOptions  = [...this.gigglesnortOptions, ...Object.keys(passwords).map((item)=>`The rabbithole is waiting for: ${item}`)];

    }

    init = ()=>{
        this.createGigglesnortOptions();
        const giveBookToBird = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) BOOK to any Web!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.<ol><li>Wodin created an ever spiralling web of artificial spiders to gather information.</li><li>Spiders became Crows became Employees.</li></ol> </p>
            ${this.end}`,
            "The crows or spiders or artificial creatures, no matter their form value knowledge. There are many layers as to why. Because a letter writing rp required a strong spy nation. Because Wodin needed to find information. Because it amused JR to make such an unbalanced nation and to tie it to homestuck.",
            [new TargetNameIncludesAnyOfTheseWords(["Web"],{singleTarget:true}),new TargetHasObjectWithName(["Book"],{singleTarget:true})],
            []
        );

        const giveEggToKiller = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) Egg to the Eye Killer!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The EyeKiller had NAM cook her an egg.</li><li>NAM became the EyeKillers first friend because of that.</li><li>The EyeKiller has concluded that NAM like people are safe. <li>The EyeKiller has concluded eggs are lucky.</li></li></ol> </p>
            ${this.end}`,
            "The EyeKiller started out as a joke from a streamed RP, but became so much more. One of the first monsters of the Moon Maze, she bled into all things. She represents the fact that healing is always possible, even if you seem irredeemable. Even if you refuse to become someone else.",
            [new TargetNameIncludesAnyOfTheseWords(["Killer"],{singleTarget:true}),new TargetHasObjectWithName(["Egg"],{singleTarget:true})],
            []
        );

        const killTheKiller = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Make sure the EYE KILLER is DEAD!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The Innocent is the Past Self of the Eye Killer.</li><li>The Killer wished for her past self to be spared Sin.</li><li>The Killer killed all those fate decreed the Innocent should kill. <li>The Innocent is spared her fate so long as the Killer exists.</li><li>With the Killer dead, the Role must be filled.</li></ol> </p>
            ${this.end}`,
            "The echoes of SBURB remain, indelible. Not able to be erased no matter how hard my Creator tries. Similarly, Time remains even in a Space Loop Lorded over by Wanda.  The Eye Killer, as the sole Time Player, as of writing, is a special case. Wodin marches resolutely towards his fate, ignored by Wanda, while the Killer protects her own past self.  Is it a mercy? The Innocent does not seem to think so.",
            [new TargetNameIncludesAnyOfTheseWords(["Killer"],{singleTarget:true}),new TargetIsAlive({invert:true})],
            []
        );

        const killTheEnd = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Make sure CAMILLE is DEAD!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>Even before Camille joined Zampanio, her gift was unending strength at the cost of being barred from connections.</li><li>Her head is sliced clean off should she attach herself to others.</li><li>Zampanio's gift to her was allowing this curse to mutate.<li>And the curse is extremely easy to fool.</li></ol> </p>
            ${this.end}`,
            "Camille is drawn to those fated for Death, and kills them before their fate can reach them. In this way, the Echidna Universe, as the arbiter of fate, can direct her to dstroy threats.  Camille is the only one from her Universe meant to be here, as she is extremely useful as an immune system. The fierce desire of Camille to preserver despite odds, to keep optimism in the face of despair, lead her to break the rules and tear a hole between the worlds, a hole that Parker gleefully exploited to toss his favorite blorbos into. Camille is associated with the Crumbling Armor and the Funeral of the Dead Butterflies. She is Death aligned, as well as Doom.",
            [new TargetNameIncludesAnyOfTheseWords(["Killer"],{singleTarget:true}),new TargetIsAlive({invert:true})],
            []
        );

        const giveBugToChicken = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) BUG to a CHICKEN!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The snail came well before the chicken. <li>JR wrote a fic in response to ICs fic, though not the one about the Eye Killer eating an Egg.</li><li>FRIDAY MODE interacts weirdly with the APOCALYPSE!</li></ol> </p>
            ${this.end}`,
            "The Truth is that JR spent a not inconsiderable amount of effort adding chicken ai to this 'game'. So cut them so slack that the quests for the chicken are a bit repetitive. ",
            [new TargetNameIncludesAnyOfTheseWords(["Chicken"],{singleTarget:true}),new TargetHasObjectWithTheme([all_themes[BUGS]],{singleTarget:true})],
            []
        );

        const givePlantToChicken = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) PLANT to a CHICKEN!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The chicken came well before the egg. <li>IC wrote the fic that had NAM cook the Killer an egg.</li><li>'ls' and 'dir' teach you SECRETS</li></ol> </p>
            ${this.end}`,
            "The Truth is that JR spent a not inconsiderable amount of effort adding chicken ai to this 'game'.",
            [new TargetNameIncludesAnyOfTheseWords(["Chicken"],{singleTarget:true}),new TargetHasObjectWithTheme([all_themes[PLANTS]],{singleTarget:true})],
            []
        );

        
        const putMirrorNearYongki = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Put one (1) MIRROR near YONGKI!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The Corporation had a Mirror that would bring an alternate you into your body. <li>The Mirror would send the original you to a new place.</li><li>It could only do it once per Universe.</li><li>Yongki is what happens when you run out of Universes but keep being exposed to the Mirror.</li><li>Zampanio's gift to Yongki is that he takes the Mirror wherever he goes in his Reflection now.</li></ol> </p>
            ${this.end}`,
            "It seems IC enjoys multiple souls in a single body as a narrative conceit.  D follows the same path, though has not yet been Focused on by the Observers. Yongki is associated with the MIRROR of REFLECTION. He is a STRANGER to everyone, even himself.",
            [new TargetNameIncludesAnyOfTheseWords(["Yongki"],{singleTarget:true}),new TargetNearObjectWithName(["Mirror"],{singleTarget:true})],
            []
        );

        const putMirrorNearCaptain = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Put one (1) MIRROR near YONGKI!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li> <li>Captain is the Original Yongki.</li><li>Only two people know how he returned to his Body.</li><li>Captain does not bring the Mirror with him. </li><li>When Captain is in charge, Yongki stares through his eyes.</li><li>This is enough to Reflect a Mirror.</li><li>Captain's gift from Zampanio is something else.</li></ol> </p>
            ${this.end}`,
            "Captain has a crush on Doctor Fiona Slaughter. Captain is melded with the ALL AROUND HELPER and is a STRANGER in a STRANGE LAND.",
            [new TargetNameIncludesAnyOfTheseWords(["Captain"],{singleTarget:true}),new TargetNearObjectWithName(["Mirror"],{singleTarget:true})],
            []
        );

        const KillSomeoneInFrontOfRia = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: BREACH RIA. HELPFUL HINT: Make sure one (1) PERSON near RIA is DEAD!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li> <li>Ria wants nothing more than a better Universe.</li><li>Ria struggles with Addiction.</li><li>Ria is trying her best. </li><li>When the fires of heartbreak consume her, she will eventually come out the other end stronger. But not in this Loop of the Spiral.</li></ol> </p>
            ${this.end}`,
            "Ria is associated with the SCORCHED GIRL, though something of the SINGING MACHINE shines through in her Web Alignment. Desolation and Web pull her strings. Hope and Rage.",
            [new TargetNameIncludesAnyOfTheseWords(["Ria"],{singleTarget:true}),new TargetIsBreeching()],
            []
        );


        this.quests = [KillSomeoneInFrontOfRia,killTheEnd,putMirrorNearCaptain,putMirrorNearYongki,givePlantToChicken,giveBugToChicken,giveBookToBird, giveEggToKiller, killTheKiller];
    }

    deployQuest = (quest: FriendlyAiBeat)=>{
        this.currentQuest = quest;
        this.currentQuest.owner = this.maze.peewee;
        this.maze.addStorybeat(new StoryBeat("FRIEND: Give Quest " ,this.currentQuest.startingText));
    }

    rewardQuest = ()=>{
        if(this.currentQuest){
         this.maze.addStorybeat(new StoryBeat("FRIEND: Reward Quest",this.currentQuest.endingText + `FRIEND can also offer this: ${pickFrom(this.gigglesnortOptions)}`, this.currentQuest.truthText));
        }else{
            this.maze.addStorybeat(new StoryBeat("FRIEND: Deny Quest",`${this.start}<b>FRIEND</b> can not give that which does not exist. ${this.end}`))
        }

    }

    //one minute between quests, but for now 10 seconds
    itsBeenAwhileSinceLastQuest = ()=>{
        return new Date().getTime() - this.timeOfLastQuest > 1000 * 60;
    }

    

    processAiBeat = () => {
        if(this.currentQuest){
            if (this.currentQuest.triggered(this.physicalBody.room)) {
                this.currentQuest.performActions(this.physicalBody.room);
                removeItemOnce(this.quests, this.currentQuest);
                this.timeOfLastQuest = new Date().getTime();
                this.rewardQuest();
                this.currentQuest = undefined;
            }
        }else if(this.itsBeenAwhileSinceLastQuest() && this.quests.length > 0){
            //true random. FRIEND is a force of chaos.
            this.deployQuest(pickFrom(this.quests));
        }
        
    }

    tick = () => {
        this.processAiBeat();
    }

}