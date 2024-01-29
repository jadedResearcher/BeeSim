
import { initStats } from "./Objects/Stat";
import { initThemes } from "./Objects/Theme";

import { getRandomNumberBetween, pickFrom } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { Maze } from "./Objects/RoomEngine/Maze";
import { createElementWithIdAndParent } from "./Utils/misc";
import { visitFunctionBody } from "typescript";
import { ApocalypseEngine } from "./Secrets/Apocalypse";
import { isItFriday } from "./Utils/URLUtils";
import { parseComments } from "./Secrets/CommentsParser";

// https://www.youtube.com/watch?v=VMUz2TNMvL0 the Watcher of Threads found this
let maze: Maze;
const handleClick = () => {
    if (maze) {
        const button = document.querySelector("#startbutton") as HTMLElement;
        if (button) {
            button.remove();
            maze.begin();
        }
        const audio = new Audio();
        audio.src = "audio/weirdmusic.mp3";
        audio.volume = 0.5;
        audio.loop= true;
        audio.play();
        window.removeEventListener("click", handleClick);
    }

}


const itsFriday = () => {
    const body = document.querySelector("body");
    if (body) {
        body.innerHTML = "";
        alert("WARNING: HIGH CONTRAST FLASHING IMAGES")
        const ele = createElementWithIdAndParent("div", body, "ItsFridaySoEastIsRestingHaveThisInstead");
        ele.innerHTML = `
        <iframe class='fuckedup' style="overflow: hidden;" width="${window.innerWidth - 10}" height="${window.innerHeight - 10}" src="https://www.youtube-nocookie.com/embed/Ti1D9t8n0qA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;

    }
}

export const whiteNight = () => {
    const body = document.querySelector("body");
    if (body) {
        body.innerHTML = "";
        const apocalypse = new ApocalypseEngine(body);
    }

}

export const renderNineCommentsOnScreen = ()=>{
    console.log("JR NOTE: rendering 9 comments on screen")
    const body = document.querySelector("body");
    const comments = (window as any).comments;
    if(!body){
        return;
    }
    for(let i = 0; i<9; i++){
        const ele = createElementWithIdAndParent("div",body, undefined,"comment" );
        ele.innerHTML = pickFrom(comments).replaceAll("\n","<br>");
        ele.style.left = `${getRandomNumberBetween(0,100)}vh`;
        ele.style.top = `${getRandomNumberBetween(0,100)}vh`;

        body.append(ele);
    }
}

const tryComments = () => {
    try {
        if (window.location.href.includes("file://")) {
            (window as any).comments = parseComments('http://farragofiction.com/LitRPGSimE/dist/bundle.js'); //gets around CORS problems for serverless files
        } else {
            (window as any).comments = parseComments('dist/bundle.js'); //dosen't brittle-ly point it at the test url
        }
    } catch (e) {
        console.error("??? why can't i load the comments?")
    }
}

const checkIfGuideOfHuntersMode= ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const guide = urlParams.get('guide'); //guide mode or not
    if(guide){
        (window as any).guideOfHunters=true;
    }
}

window.onload = async () => {
    tryComments();
    checkIfGuideOfHuntersMode();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const apocalypse = urlParams.get('apocalypse');
    //NOTE, seed and themes will be loaded at the maze level

    //the apocalypse overrides friday (but has its own special hell for it)
    if (apocalypse === "night") {
        whiteNight();
        return;
    } else if (isItFriday()) {
        itsFriday();
        return;
    }

    const ele = document.querySelector("#current-room") as HTMLElement;
    const storySoFar = document.querySelector(".story-so-far") as HTMLElement;
    storySoFar.innerHTML = "";
    const button = createElementWithIdAndParent("button", storySoFar, "startbutton");
    button.innerText = "Click To Begin!";
    initStats();
    initThemes();
    const seed = 13;
    if (ele && storySoFar) {
        console.log("JR NOTE: making maze")
        maze = new Maze(ele, storySoFar, new SeededRandom(seed));
    }

    window.addEventListener("click", handleClick);
    const pauseButton = document.querySelector("#pause") as HTMLElement;
    pauseButton.addEventListener("click", handlePause);


}

const handlePause = (event: MouseEvent) => {
    console.log("JR NOTE: pause button was clicked", maze.tickingStatus())
    if (maze.tickingStatus()) {
        maze.pause();
    } else {
        maze.resume();
    }
    if (event.target) {
        maze.tickingStatus() ? (event.target as HTMLElement).innerText = "Pause" : (event.target as HTMLElement).innerText = "Play";
    }
}



//the text should be a javascript file exporting const text.
export function loadSecretText(location: string) {
    return require(`./${location}`).text
}


