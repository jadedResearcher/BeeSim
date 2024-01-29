//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)

import { Room } from "../Objects/RoomEngine/Room";
import { TranscriptEngine } from "./Transcript";


//https://verbosebabbler.tumblr.com/post/691448067434676224/is-zampanio-real-and-does-it-matter
//https://verbosebabbler.tumblr.com/post/693198522796965888/zampanio-and-the-history-of-games


//look, okay, al bhed from ffx is something that for *some* percent of the population feels in their bones
//so this will drive home a nagging sense of familiarity, that it MUST be important
//at the same time when you look at it in writing it's gibberish
//but when you hear it spoken it flirts with being just phonetic english with an accent
//it vibes perfectly with the sense of misleading truths and lies with a core of truth
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
//YPLTAVKREZGMSHUBXNCDIJFQOW
//https://lingojam.com/AlBhedTranslator you're welcome
export const albhed_map = {
    "a": "Y",
    "b": "P",
    "c": "L",
    "d": "T",
    "e": "A",
    "f": "V",
    "g": "K",
    "h": "R",
    "i": "E",
    "j": "Z",
    "k": "G",
    "l": "M",
    "m": "S",
    "n": "H",
    "o": "U",
    "p": "B",
    "q": "X",
    "r": "N",
    "s": "C",
    "t": "D",
    "u": "I",
    "v": "J",
    "w": "F",
    "x": "Q",
    "y": "O",
    "z": "W",
    "0": "https://www.tumblr.com/blog/view/figuringoutnothing/688028145704665088?source=share",//when they were the guide of observers
    "1": "http://farragofiction.com/DevonaFears",
    "2": "https://verbosebabbler.tumblr.com/post/692334755682877440/the-faq-who-is-writing-this-thing",
    "3": "https://app.milanote.com/1O9Vsn15w4UteW/shipping-grid?p=i9yTbJxrme8 by the Watcher of Threads", //by the watcher of threads
    "4": "http://farragofiction.com/PerfectHeist/",
    "5": "https://theobscuregame.tumblr.com/   the waste's arc number, except without numbers (The Watcher says they won't spell it out)",
    "7": "https://www.royalroad.com/fiction/56715/the-encyclopedia-arcane",//yellow,
    "8": "https://verbosebabbler.tumblr.com/post/691448067434676224/is-zampanio-real-and-does-it-matter",//but now the guide of hunters
    "9": "https://scratch.mit.edu/projects/719496869/ Taxonomist of Strangers",
    "!": "http://farragofiction.com/DocSlaughterFileServer",
    "?": "http://farragofiction.com/ParkerLotLost/",
    ".": "http://farragofiction.com/NotebookSimulator/",
    ",": "http://farragofiction.com/LightAndVoid/?dearWitherby=true",
    ";": "https://github.com/FarragoFiction/EastEast",
    "`": "http://farragofiction.com/TitlePendingFanWork/",
    "-": "https://farragofiction.com/DearDiary?truth=true"

    //0: http://farragofiction.com/ParkerLotLost/ <-- maybe this will be EastEastEast one day, that or ElevatorSim
    //11: http://farragofiction.com/DocSlaughterFileServer 
    //https://jadedresearcher.tumblr.com/post/692341174641606656
    //https://jadedresearcher.tumblr.com/post/692340754690015232/but-like-italians-are-real-and-arent-all
}
//the watcher gives us help https://archive.org/details/house-of-leaves-by-mark-z.-danielewski/mode/2up

//https://online.fliphtml5.com/yumtb/jvtz/
export const translate = (word: string) => {
    let ret = word.toLowerCase();
    let done = "";
    for (let i = 0; i < word.length; i++) {
        if ((albhed_map as any)[ret[i]] && !done.includes(ret[i])) {
            done += ret[i];
            //replaceAll is actually really new, ts doesn't like it rip
            ret = (ret as any).replaceAll(ret[i], (albhed_map as any)[ret[i]]);
        }
    }
    return ret;
}

export const initRabbitHole = (room: Room) => {
    const hole = document.querySelector("#rabbithole") as HTMLElement;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const password = urlParams.get('password')

    if (password) {
        const target = document.querySelector("body") as HTMLElement;

        if (!target) {
            return;
        }
        target.innerHTML = "";//clear;
        const te = new TranscriptEngine(target);
        te.handlePW(password);
    } else {

        hole.onclick = () => {
            const target = document.querySelector("body") as HTMLElement;

            if (!target) {
                return;
            }
            room.stopTicking();
            target.innerHTML = "";//clear;
            const te = new TranscriptEngine(target);
        }
    }
}




export class Secret {
    video_file_name?: string;
    bonus_html?: string;

    text: string;
    title: string;
    constructor(title: string, text: string, html?: string, video_file_name?: string,) {
        this.video_file_name = video_file_name;
        this.bonus_html = html;
        this.text = text;
        this.title = title;

    }

}


export class Slaughter {

    text: string;
    title: string;
    completion_comment?: string;
    constructor(title: string, text: string, completion_comment?: string) {
        this.text = text;
        this.title = title;
        this.completion_comment = completion_comment;
    }

}

//lets play of south is summarized here by the Guide: https://www.tumblr.com/blog/view/figuringoutnothing/689403345728847873?source=share

export interface PasswordMap {
    [details: string]: Secret;
}

export interface SlaughterMap {
    [details: string]: Slaughter;
}
//https://youtu.be/m5eyhShxn5M

//https://archiveofourown.org/works/40961847

/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
/*
LAPIN
WHAT WILL YOU CREATE
99 Rooms
kINTSUGI
you do not recognize the bodies in the water
eternal darkness
chimps don't dance for bastards
mutations on mutations on mutations :)
ZampanioBroken
most innovative shooter 
It Has A Rather Lovely Ending
Spatial Horror
AThirdTranscript
The Corporation still serves as the main trading partner of the Great Powers, and fares well enough with JR at their head. -https://www.royalroad.com/fiction/40920/the-path-of-ascension/chapter/964367/the-path-of-ascension-chapter-153
ASecondPersonalTranscript/
earworm humming in a dream
Natalie Yemet (thinks their mom is the customer service rep. has an order for a game they don't remember)
some kind of mafia scheme (accuses eyedol of kidnapping)
SLAUGHTERHOUSE 9
https://creepypasta.fandom.com/wiki/It_Has_a_Rather_Lovely_Ending

*/

//https://the1whoscreams.neocities.org/

/*I just really really like the bellow phrase */

/*
Bits of my personal truth stashed in corners and corners of corners and so on until it's not just a personal page anymore, it's a sprawling maze of me.

-https://the1whoscreams.neocities.org/manifesto.html
*/

/*
    What I love the most about the blorbos is that.  They, all of them, have trauma in their pasts.

    Things that are hard to get over.

    When the training team first came to the Echidna they couldn't even watch media because everything, EVERYTHING had bad memories.

    But here is a Truth.

    This too, shall pass.

    You can get better. 

    Things can get better.

    There is always reason to hope.

    Always.

    The blorbos support each other and rest and recover and learn to care again.

    No matter how deep they seem to be sunk into their problems, their fears, their bad habits. 

    It's okay if everything feels too much right now.

    All you need to do is survive.
*/



//http://farragofiction.com/AThirdTranscript/
export const passwords: PasswordMap = {
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", "Secrets/Content/0.js")
    , "STANDARD SALMONSUSHI": new Secret("Confessionals 1", "Secrets/Content/1.js")
    , "THE END IS NEVER THE END": new Secret("Confessionals 2", "Secrets/Content/2.js")
    , "YOU CAN GET BETTER": new Secret("Confessionals 3", "Secrets/Content/3.js")
    , "KNOW RESTRAINT": new Secret("Confessionals 4", "Secrets/Content/4.js")
    , "NO RESTRAINT": new Secret("Confessionals 5", "Secrets/Content/5.js")
    , "POWER CORRUPTS": new Secret("Jumbled Mess", "Secrets/Content/20.js")
    , "KNOWLEDGE IS POWER": new Secret("Jumbled Mess: Explanation", "Secrets/Content/21.js")
    , "LEAVE YOUR MARK": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/22.js")
    , "TAKE YOUR PLACE IN HISTORY": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/23.js")
    , "THE FOOL IS DEAD": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/24.js")
    , "BITS OF THE PAST LEAK INTO THE PRESENT": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/26.js")

    , "INFINITE AMOUNT OF PAIN": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/27.js")
    , "PEER INTO THE ABYSS AND SEE WHAT LIES BENEATH": new Secret("Hostage's Lament", "Secrets/Content/28.js")
    , "ELIAS SMITH": new Secret("JR Ramble", "Secrets/Content/29.js")
   , "ONCE YOU OPEN THE CURTAINS ALL THAT'S LEFT TO DO IS GO TO THE OTHER SIDE AND CLOSE THEM AGAIN": new Secret("Notes of Slaughter 15", "Secrets/Content/35.js")
    , "PARADISE AND PARASITE": new Secret("ARM2: LOOP ???", "Secrets/Content/38.js")
    , "WIDOWS WEAVE": new Secret("BLAME THE SPIDERS FOR THIS", "", "", "http://farragofiction.com/ZampanioHotlink/Films/spiders.mp4") //widows weave was a famous Web aligned cursed video in the magnus archives, figured i'd throw yall a bone because its so obscure
    , "NO NEED TO ASK WHY": new Secret("Herald Made MY JAM", "", "", "http://farragofiction.com/ZampanioHotlink/Films/heraldstacos.mp4")
    , "HOW YOUR BRAIN LIES TO YOU": new Secret("JR RAMBLE", "Secrets/Content/42.js")
    , "BLUE CAN SEE MORE THAN ORANGE": new Secret("GIGGLESNORT", "Secrets/Content/44.js")
    , "YOU IS NEEDED": new Secret("Quotidian", "", `<video class='fuckedup' src="http://farragofiction.com/ZampanioHotlink/Films/michael_from_vsauce_says_quotidian.mp4" loop="true" controls="true" autoplay="true"></video>`)
    , "ZAMPANIOBROKEN": new Secret("The Watcher of Threads is right: Wanda would love these:", "", `<iframe class="fuckedup" width="560" height="315" src="https://www.youtube.com/embed/cTspoOpLgfc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
    , "EARWORM HUMMING IN A DREAM": new Secret("24/7 ABSOLUTE BULLSHIT", "", `<iframe class="fuckedup" width="560" height="315" src="https://www.youtube.com/embed/16WNvL8Gtt0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>secret = 'v=ZrE-iv8F8Wg'</p>`)
    ,"PLACE YOUR TRUST IN ME": new Secret("Notes of Slaughter: Prelude", "Secrets/Content/6.js")
    ,"MEMENTO MORI": new Secret("Caging of an Innocent 1", "Secrets/Content/46.js")
    ,"MEMENTO VIVERE": new Secret("Caging of an Innocent 2", "Secrets/Content/47.js")
    ,"KINTSUGI": new Secret("DM made my symbol even cooler.", "",`<img style="background: white; width: 500px;" src = 'http://farragofiction.com/ZampanioHotlink/maze9b.svg' alt = "dm made my symbol even cooler...kintsugi is also something i'm associated with."><p>The Mind Neuron from Homestuck, Three Question Marks, The Yellow Sign. DM was a Genius designing this, then he took it up a notch by adding in the Maze.</p>`)
    
    ,"MIX OF TRUTH AND LIES": new Secret("Animorphs",  "Secrets/Content/61.js")

    , "LS": new Secret("FILE LIST (UNIX)", "Secrets/PasswordStorage.ts")
    , "DIR": new Secret("FILE LIST (DOS)", "Secrets/PasswordStorage.ts")


};

/*
todo: 
*make it more clear (even if just to wastes) that doc is broadly WRONG about the bleedover from the artifacts.  you dont need magic to not be "normal" by Morgans Hill standards. (seriously, closer just is static, and the artifact is incidental)  tho nam is, quiet evidently, actually caused by bleedover BECAUSE he's native to the artifacts universe)
*/
//note: the point of the slaughter notes is to highlight the diffrence between a mindless autonomata and the full, vibrant person
export const docSlaughtersFiles: SlaughterMap = {
    "ETERNAL DARKNESS": new Slaughter("Notes of Slaughter 0", "Secrets/Content/45.js","Child, do you Understand?")
    , "TELEGRAM1": new Slaughter("Morgan's Hill Telegram 1", "Secrets/Content/51.js")
    , "RAISE YOU FROM THE END OF THE WORLD": new Slaughter("Notes of Slaughter 0", "Secrets/Content/7.js","Child, do you Understand?")
    , "TELEGRAM2": new Slaughter("Morgan's Hill Telegram 2", "Secrets/Content/52.js")

    , "SERENE AND CALM": new Slaughter("Notes of Slaughter 1", "Secrets/Content/8.js")
    , "TELEGRAM3": new Slaughter("Morgan's Hill Telegram 3", "Secrets/Content/53.js")

    , "BEWARE OBLIVION IS AT HAND": new Slaughter("Notes of Slaughter 2", "Secrets/Content/9.js")
    , "TELEGRAM4": new Slaughter("Morgan's Hill Telegram 4", "Secrets/Content/54.js")

    , "I AM HERE TO TREAT DISEASE": new Slaughter("Notes of Slaughter 3", "Secrets/Content/10.js")
    , "TELEGRAM5": new Slaughter("Morgan's Hill Telegram 5", "Secrets/Content/55.js")

    , "FLESH IS BOUND TO THE FLOW OF TIME": new Slaughter("Notes of Slaughter 4", "Secrets/Content/11.js")
    , "TELEGRAM6": new Slaughter("Morgan's Hill Telegram 6", "Secrets/Content/56.js")

    , "TIME IS DEAD": new Slaughter("Notes of Slaughter 5", "Secrets/Content/12.js")
    , "TELEGRAM7": new Slaughter("Morgan's Hill Telegram 7", "Secrets/Content/57.js")

    , "SAVE YOUR LIFE FROM DESTRUCTION": new Slaughter("Notes of Slaughter 6", "Secrets/Content/13.js")
    , "TELEGRAM8": new Slaughter("Morgan's Hill Telegram 8", "Secrets/Content/58.js")

    , "GENTLE CROONING VOICE": new Slaughter("Notes of Slaughter 7", "Secrets/Content/14.js")
    , "LOOKS AFTER THE BROKEN": new Slaughter("Notes of Slaughter 8", "Secrets/Content/15.js")
    , "TAKE CARE OF OTHERS": new Slaughter("Notes of Slaughter 9", "Secrets/Content/16.js")
    , "IT WAS DAWN": new Slaughter("Notes of Slaughter 10", "Secrets/Content/17.js")
    , "THE SOUL IS IMMORTAL": new Slaughter("Notes of Slaughter 11", "Secrets/Content/18.js")
    , "WHEN ALL HAD ABANDONED HOPE": new Slaughter("Notes of Slaughter 12", "Secrets/Content/19.js")
    , "WHAT IS BROKEN CAN BE UNBROKEN": new Slaughter("Notes of Slaughter 13", "Secrets/Content/30.js")
    , "PENNY WICKNER": new Slaughter("Notes of Slaughter 14", "Secrets/Content/31.js")
    , "EXPERIMENTALMUSIC": new Slaughter("Notes of Slaughter 16: ExperimentalMusic Part 1", "Secrets/Content/36.js")
    , "EXPERIMENTALMUSIC2": new Slaughter("Notes of Slaughter 16: ExperimentalMusic Part 2", "Secrets/Content/48.js")
    , "EXPERIMENTALMUSIC3": new Slaughter("Notes of Slaughter 16: ExperimentalMusic Part 3", "Secrets/Content/49.js")
    , "EXPERIMENTALMUSIC4": new Slaughter("Notes of Slaughter 16: ExperimentalMusic Part 4", "Secrets/Content/50.js")
    , "TELEGRAM9": new Slaughter("Morgan's Hill Telegram 8", "Secrets/Content/59.js")


    
}


//future me, don't forget https://www.tumblr.com/blog/view/jadedresearcher/688182806608838656?source=share
export const text = `${Object.keys(passwords).length} Items:.\n.\n.\n.\n ${Object.keys(passwords).join("\n")}`;