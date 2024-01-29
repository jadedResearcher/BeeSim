
import {  Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIM_SCRIPT } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";


//do you want to be a Thing (whether romantic or platonic?)
export class BefriendTargetByAmount extends Action {
    importantReturn = true;

    amount: number; //can pass it a negative too

    recognizedCommands: string[] = [];
    constructor(amount:number){
        super();
        this.amount = amount;
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

        for(let target of beat.targets){
            if(target instanceof Quotidian){
                subject.likeBlorboMore(target,this.amount);
            }
        }
        
        return "";

    }

}