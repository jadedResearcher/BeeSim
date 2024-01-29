
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";


export class IncrementState extends Action {



    recognizedCommands: string[] = [];
    flavorText:string;
    constructor(flavorText:string){
        super();
        this.flavorText = flavorText;
    }   

    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian)=>{
        return `${subject.processedName()} doesn't see anything to alter.`;
    }

    withTargets = (beat: AiBeat,current_room: Room, subject: Quotidian, targets: PhysicalObject[])=>{
        let killed = false;
        for(let target of targets){
           target.incrementState();
        }
        if(!killed){
            return this.noTarget(beat, current_room, subject);
        }
        return `${subject.processedName()} ${this.flavorText}  ${turnArrayIntoHumanSentence(targets.map((e)=>e.processedName()))}.`;

    }


    applyAction = (beat: AiBeat)=>{
        const current_room = beat.owner?.room;
        if(!current_room){
            return "";
        }
        const subject = beat.owner;
        if(!subject){
            return "";
        }

    
        const targets = beat.targets;
        if(targets.length ===0){
            return this.noTarget(beat, current_room, subject);
        }else{
            return this.withTargets(beat, current_room, subject, targets);
        }
    }

}