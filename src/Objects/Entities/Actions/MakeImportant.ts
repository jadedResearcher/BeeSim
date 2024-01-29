
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { FEMALE, himPronoun, MALE, Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";


export class MakeImportant extends Action {


    recognizedCommands: string[] = [];

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
                subject.realizeIHaveASquishOnBlorbo(target);
            }

        }
        return "";

    }

}