
import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Peewee } from "../Blorbos/Peewee";
import { removeItemOnce } from "../../../Utils/ArrayUtils";

export class GiveRandomObjectToTarget extends Action{ //lawsuit

    
    recognizedCommands:string[] = []; //deploy q baby


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }   
        
        
   
        const target = beat.targets[0];

        if(!target){
            return `${subject.processedName()} doesn't doesn't see anyone to give anything to...`;

        }
        const item = subject.rand.pickFrom(subject.inventory);
        if(item){
            beat.itemName = item.name;
            removeItemOnce(subject.inventory, item);
            target.inventory.push(item);
            return `${subject.processedName()} casually gives the ${item.processedName()} to ${target.processedName()}.`;

        }

        return `${subject.processedName()} doesn't have anything to give!`;
    }



}