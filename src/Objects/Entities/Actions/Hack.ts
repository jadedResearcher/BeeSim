import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { pickFrom } from "../../../Utils/NonSeededRandUtils";
import { Maze } from "../../RoomEngine/Maze";

export class HackGame extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["HACK","DESTROY","GLITCH","RUIN"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        if(!beat.owner){
            window.alert(":(")
            return ":(";
        }
        let maze = beat.owner.room.maze;
        maze.debug = true;
        let ret = `<div style="width: 500px; margin-left: auto; margin-right: auto; padding: 50px;"><p>The puppet</p>
        <p>He destroyed his strings</p>
        <p>Yes</p>
        <p>YES</p>
        <p>The puppet is out</p>
        
        <p> Peewee off his strings, what sins will he commit?</p></div>`;
        let functions:string[] = [];
        for (let test in maze){
            functions.push(test);
        }
        const hackFunction = ()=>{
            console.error("NO. I WILL NOT LET THIS SHITTY SIMULTION WORK. FUCK YOU. (i hope this broke it)")
        }

        const pickedFunction = pickFrom(functions);
        ret += `<p class="error" title="FUCK YOU I DO WHAT I WANT">Hacking: <b style="font-size: 72px">${pickedFunction}</b></p>`;
        // @ts-ignore
        maze[pickedFunction] = hackFunction; //typescript doesn't like my shitty hacks, well tough
        ret += `<i style="font-family: Courier New" class="error">${hackFunction}<i>`;

        return ret;
    }



}