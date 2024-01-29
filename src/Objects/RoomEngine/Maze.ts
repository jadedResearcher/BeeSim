import { initRabbitHole } from "../../Secrets/PasswordStorage";
import { createElementWithIdAndParent } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";

import { all_themes } from "../Theme";
import { ENDINGS, WEB, SPYING, TECHNOLOGY, OBFUSCATION, KILLING, FIRE, LONELY, SOUL, CLOWNS, KNOWING, CENSORSHIP, TWISTING } from "../ThemeStorage";
import { ChantingEngine } from "./ChantingEngine";
import { randomRoomWithThemes, Room } from "./Room";
import { StoryBeat } from "./StoryBeat";
//reminder that order of imports is going to matter, if wrong order 'class extends value undefined'
import { EyeKiller, Innocent } from "../Entities/Blorbos/EyeKiller";
import { Peewee } from "../Entities/Blorbos/Peewee";
import { Quotidian } from "../Entities/Blorbos/Quotidian";
import { Snail } from "../Entities/Blorbos/SnailFriend";
import { JR } from "../Entities/Blorbos/JR";
import { Ria } from "../Entities/Blorbos/Match";
import { Underscore, Vik } from "../Entities/Blorbos/Underscore";
import { LIGHT } from "../Stat";
import { Solemn } from "../Entities/Blorbos/Solemn";
import { Devona } from "../Entities/Blorbos/Devona";
import { Neville } from "../Entities/Blorbos/Neville";
import { Chicken } from "../Entities/Blorbos/ChickenFriend";
import { Yongki } from "../Entities/Blorbos/Yongki";
import { updateURLParams } from "../../Utils/URLUtils";
import { whiteNight } from "../..";
import { Camille } from "../Entities/Blorbos/End";
import { Parker } from "../Entities/Blorbos/Parker";
import { Khana } from "../Entities/Blorbos/K";
import { Goncharov } from "../Entities/Blorbos/Goncharov";
import { Andre } from "../Entities/Blorbos/Andre";
import { Katya } from "../Entities/Blorbos/Katya";
import { Mario } from "../Entities/Blorbos/Mario";
import { IcePickJoe } from "../Entities/Blorbos/IcePickJoe";
import { ThemeBee } from "../Entities/Blorbos/ThemeBee";
export class Maze {

    rand: SeededRandom;
    ele: HTMLElement;
    debug = false;
    room?: Room;
    peewee?: Peewee; //all are quotidians in this twisted farce of a play. could a simulation capture their nuance? their depth?
    storybeats: StoryBeat[] = []; //can be added to by peewee and by the ai
    storySoFar: HTMLElement;
    boopAudio = new Audio("audio/264828__cmdrobot__text-message-or-videogame-jump.mp3")
    doorAudio = new Audio("audio/close_door_1.mp3")
    chantingEngine = new ChantingEngine();
    blorbos: Quotidian[] = [];//list of all possible blorbos that can spawn.
    artifacts = [
        { name: "Unos Artifact Book", layer: 1, src: `Artifacts/Zampanio_Artifact_01_Book.png`, themes: [all_themes[SOUL], all_themes[OBFUSCATION]], desc: "A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Duo Mask", layer: 1, src: `Artifacts/Zampanio_Artifact_02_Mask.png`, themes: [all_themes[CLOWNS], all_themes[OBFUSCATION]], desc: "A faceless theater mask with a 2 on the inside of the forehead. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Tres Bottle", layer: 1, src: `Artifacts/Zampanio_Artifact_03_Bottle.png`, themes: [all_themes[OBFUSCATION]], desc: "A simple glass milk bottle with a 3 emblazoned on it. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Quatro Blade", layer: 1, src: `Artifacts/Zampanio_Artifact_04_Razor.png`, themes: [all_themes[KILLING], all_themes[OBFUSCATION]], desc: "A dull straight razor stained with blood, a number 4 is etched onto the side of the blade. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Quinque Cloak", layer: 1, src: `Artifacts/Zampanio_Artifact_05_Cloak.png`, themes: [all_themes[OBFUSCATION]], desc: " A simple matte blue cloak with a 5 embroidered on the back in shiny red thread. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Sextant", layer: 1, src: `Artifacts/Zampanio_Artifact_06_Sextant.png`, themes: [all_themes[OBFUSCATION]], desc: "A highly polished brass sextant. There is a 6 carved onto the main knob. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Septum Coin", layer: 1, src: `Artifacts/Zampanio_Artifact_07_Coin_Bronze.png`, themes: [all_themes[OBFUSCATION]], desc: "An old bronze coin. There is a theater mask on one side, and a 7 on the other. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Octome", layer: 1, src: `Artifacts/Zampanio_Artifact_08_Tome.png`, themes: [all_themes[KNOWING], all_themes[OBFUSCATION]], desc: "A crumbling leather book with seemingly latin script, with messily torn pages.  There is an 8 embossed onto the back. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
        , { name: "Novum Mirror", layer: 1, src: `Artifacts/Zampanio_Artifact_09_Mirror.png`, themes: [all_themes[OBFUSCATION]], desc: "An ornate but tarnished silver mirror, with a 9 carved onto the back. It is said to reflect everything but faces. It is said that if all 9 Artifacts are united, the Apocalypse will begin." }
    ];

    constructor(ele: HTMLElement, storySoFar: HTMLElement, rand: SeededRandom,) {
        this.rand = new SeededRandom(rand.internal_seed);
        this.ele = ele;
        this.storySoFar = storySoFar;
        this.initialize();
    }

    initialize = async () => {
        let themes = [all_themes[ENDINGS], all_themes[WEB], all_themes[TECHNOLOGY]]
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const seed = urlParams.get('seed');
        const urlThemes = urlParams.get('themes');
        if (seed) {
            this.rand = new SeededRandom(parseInt(seed)); //load seed from url
        } else {
            this.rand = new SeededRandom(1972000401);
        }

        if (urlThemes) {
            themes = urlThemes.split(",").map((item) => all_themes[item]);
        }
        this.room = await randomRoomWithThemes(this, this.ele, themes, this.rand);
        this.initializeBlorbos();
        await this.room.propagateMaze(3);
        this.peewee = new Peewee(this.room, 150, 350);
        this.changeRoom(this.room, false);
        initRabbitHole(this.room);
    }
    //GONCHAROV (not related to this, although it WOULD be fun to add him to the sim), just using it as a reminder
    initializeBlorbos = () => {
        if (this.room) {
            this.blorbos.push(new Vik(this.room, 150, 150),
                new Quotidian(this.room, "Quotidian", 150, 350, [all_themes[SPYING]], { default_src: { src: "humanoid_crow.gif", width: 50, height: 50 } }, "testing", []));
            this.blorbos.push(new Snail(this.room, 150, 150));
            this.blorbos.push(new Chicken(this.room, 150, 150));
            this.blorbos.push(new EyeKiller(this.room, 150, 150));
            this.blorbos.push(new Innocent(this.room, 150, 150));
            this.blorbos.push(new Ria(this.room, 150, 150));
            this.blorbos.push(new Camille(this.room, 150, 150));
            this.blorbos.push(new Solemn(this.room, 150, 150));
            this.blorbos.push(new Devona(this.room, 150, 150));
            this.blorbos.push(new Neville(this.room, 150, 150));
            this.blorbos.push(new Yongki(this.room, 150, 150));
            this.blorbos.push(new JR(this.room, 150, 150));
            this.blorbos.push(new Khana(this.room, 150, 150));
            this.blorbos.push(new Parker(this.room, 150, 150));
            this.blorbos.push(new Goncharov(this.room, 150, 150));
            this.blorbos.push(new Andre(this.room, 150, 150));
            this.blorbos.push(new Katya(this.room, 150, 150));
            this.blorbos.push(new Mario(this.room, 150, 150));
            this.blorbos.push(new IcePickJoe(this.room, 150, 150));

            for (let theme of Object.values(all_themes)) {
                this.blorbos.push(new ThemeBee(this.room, [theme], 150, 150));
            }


        }
    }

    begin = () => {
        console.log("JR NOTE: begining")
        this.handleCommands();
        this.room?.render();
        this.chantingEngine.start();
    }

    playDoorSound = () => {
        try {
            this.doorAudio.play();
        } catch (e) {
            console.warn("JR NOTE: remember to require a click before starting")
        }
    }

    //even if they aren't in the current room
    findBlorboNamed = (name: string) => {
        for (let blorbo of this.blorbos) {
            if (blorbo.processedName().toUpperCase().includes(name.toUpperCase())) {
                return blorbo;
            }
            for (let state of blorbo.states) {
                if (state.processedName().toUpperCase().includes(name.toUpperCase())) {
                    return blorbo;
                }
            }
        }
    }

    spawnBlorbos = () => {
        if (!this.room) {
            return;
        }
        //const blorbosToTest = ["Camille", "Ria"];
        const blorbosToTest: string[] = [];
        for (let blorbo of this.blorbos) {
            if (!blorbo.owner) {//if you're in someones inventory, no spawning for you
                for (let theme of blorbo.themes) {
                    if (this.room.themes.includes(theme)) {
                        if (blorbo.name.includes("Bee") || this.room.rand.nextDouble() > 0.95) {
                            this.room.addBlorbo(blorbo);
                        }
                    }
                }

                for (let name of blorbosToTest) {
                    if (blorbo.name.includes(name)) {
                        this.room.addBlorbo(blorbo);
                    }
                }
            }

        }
    }

    tickingStatus = () => {
        if (this.room) {
            return this.room.ticking;
        }
        return false;
    }

    pause = () => {
        if (this.room) {
            this.addStorybeat(new StoryBeat("Pause", "The Simulation Pauses."))
            this.room.stopTicking();
        }
    }

    resume = () => {
        if (this.room) {
            this.addStorybeat(new StoryBeat("Resume", "The Simulation Resumes."))
            this.room.resumeTicking();
        }
    }

    updateURL = () => {
        if (!this.room) {
            return;
        }
        var pageUrl = `seed=${this.room.rand.initial_seed}&themes=${this.room.themes.map((item) => item.key)}`;
        updateURLParams(pageUrl);
    }

    changeRoom = (room: Room, render = true) => {
        if (this.room) {
            this.room.teardown();
        }
        if (this.peewee) {
            this.peewee.x = 150;
            this.peewee.y = 350;
        }
        this.room = room;
        this.room.clearBlorbos();

        this.room.peewee = this.peewee;
        if (this.peewee) {
            room.addBlorbo(this.peewee);
            this.peewee.goStill();
        }
        this.spawnBlorbos();
        this.updateURL();
        if (render) {
            console.log("JR NOTE: rendering the new room, because i think this is true:", render)
            this.room.render();
        }
    }

    addCommandStorybeat = (beat: StoryBeat) => {
        if (this.peewee) {
            this.peewee.processStorybeat(beat);
        }
        this.addStorybeat(beat);
    }

    checkEffects = (beat: StoryBeat) => {
        if (!this.room) {
            return;
        }
        const classes = [
            { name: "blood", theme: all_themes[KILLING] }
            , { name: "light", theme: all_themes[SPYING] }
            , { name: "fire", theme: all_themes[FIRE] }
            , { name: "lonely", theme: all_themes[LONELY] }
            , { name: "void", theme: all_themes[OBFUSCATION] }

            , { name: "censored", theme: all_themes[CENSORSHIP] }
        ]

        for (let map of classes) {
            for (let blorbo of this.blorbos) {
                if (blorbo.breaching && blorbo.themes.includes(map.theme)) {
                    //console.log(`JR NOTE: ${blorbo.name} is breaching, their aliases are ${blorbo.states.map((i)=>i.name).join(",")} `)
                    beat.checkClass(blorbo.aliases(), map.name)
                }
            }

            for (let item of this.room?.items) {
                if (item.breaching && item.themes.includes(map.theme)) {
                    beat.checkClass([...item.name, ...(item.states.map((i) => i.name))], map.name)
                }
            }
        }

    }

    truthConsole = (title: string, text: string) => {
        const trueStyle = "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;";

        console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", trueStyle);

    }

    addStorybeat = (beat: StoryBeat) => {
        this.boopAudio.play();
        this.storybeats.push(beat);
        const beatele = createElementWithIdAndParent("div", this.storySoFar, undefined, "storybeat")
        const commandele = createElementWithIdAndParent("div", beatele, undefined, "historical-command")
        const responseele = createElementWithIdAndParent("div", beatele, undefined, "response")
        commandele.innerHTML = `>${beat.command} ${this.debug ? new Date().toLocaleTimeString() : ""}`;
        responseele.innerHTML = beat.response;
        this.checkEffects(beat);
        commandele.className = (beat.commandClass);
        responseele.className = (beat.responseClass);


        if (beat.truthfulComment) {
            this.truthConsole(beat.command, beat.truthfulComment)
        }
        this.storySoFar.scrollTo(0, this.storySoFar.scrollHeight);
    }

    apocalypse = () => {
        updateURLParams("apocalypse=night")
        whiteNight();
        this.chantingEngine.listen();
    }

    handleCommands = () => {
        const form = document.querySelector("#puppet-command") as HTMLFormElement;
        const input = document.querySelector("#puppet-input") as HTMLInputElement;
        if (form && input) {
            form.onsubmit = (event: SubmitEvent) => {
                event.preventDefault();
                this.addCommandStorybeat(new StoryBeat(input.value, ""));
                input.value = "";
                return false;
            }
            this.addCommandStorybeat(new StoryBeat("Peewee: Await Commands", "If you do not know how to command Peewee, I'd suggest typing 'help'. See. Not even gigglesnort. I'm really trying here. I could have been all 'I suggest asking for help' but no. Type help. In the little text box down there. I'm rooting for you :) :) :)"));
        }
    }


}