
import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Peewee } from "../Blorbos/Peewee";

export class DropObjectWithName extends Action{ //lawsuit

    name:string;
    
    recognizedCommands:string[] = ["DEPLOY","YEET","DROP"]; //deploy q baby

    constructor(name: string){
        super();
        this.name = name;
    }

    handleProcessingPeeweeInput = (input: string[], peewee: Peewee)=>{
        /*
            go through the input and look for a word that matches an item peewee is currently holding.
            if you find one, set it to be the name.
        */
            //this does mean that peewee will cheerfully decide that "the gun" and "the apple" are the same thing because they both have "the".  deal with it.
            this.name = "[GLITCH]";
            for(let word of input){
                for(let item of peewee.inventory){
                    if(item.name.toUpperCase().includes(word.toUpperCase())){
                        this.name = word;
                        break;
                    }
                }
            }
    }


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }   
        
        
        //first, do i have an item called that?
        let item;
        const target = beat.targets.length > 0 ?beat.targets[0] : subject;
        for(let object of target.inventory){
            if(object.name.toUpperCase().includes(this.name.toUpperCase())){
                item = object;
                break;
            }
        }
        if(item){
            target.dropObject(item);
            return `${subject.processedName()} casually drops the ${item.name}.`;

        }

        return `${subject.processedName()} doesn't have a ${this.name} to drop!`;
    }



}