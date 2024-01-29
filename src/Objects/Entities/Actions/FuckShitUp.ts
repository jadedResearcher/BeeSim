

import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";


export class FuckShitUp extends Action {
    time: string; //infinite or like, 3s, how long you want this to run for


    recognizedCommands: string[] = [];
    constructor(time:string){
        super();
        this.time = time;
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
        subject.fuckShitUP(this.time);
        return `${subject.processedName()} gets fucked up`;

    }

}