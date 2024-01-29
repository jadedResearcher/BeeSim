
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";


export class IncrementMyState extends Action {



    recognizedCommands: string[] = [];
    flavorText:string;
    constructor(flavorText:string){
        super();
        this.flavorText = flavorText;
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
        subject.incrementState();
        return `${subject.processedName()} ${this.flavorText}`;

    }

}