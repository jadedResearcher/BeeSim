
import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Peewee } from "../Blorbos/Peewee";
import { removeItemOnce } from "../../../Utils/ArrayUtils";

export class GiveObjectWithName extends Action{ //lawsuit

    name:string;
    
    recognizedCommands:string[] = ["GIVE","GIFT","OFFER","BESTOW"]; //deploy q baby

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
        const target = beat.targets[0];

        if(!target){
            return `${subject.processedName()} doesn't doesn't see anyone to give anything to...`;

        }
        for(let object of subject.inventory){
            if(object.name.toUpperCase().includes(this.name.toUpperCase())){
                item = object;
                break;
            }
        }
        if(item){
            removeItemOnce(subject.inventory, item);
            target.inventory.push(item);
            return `${subject.processedName()} casually gives the ${item.processedName()} to ${target.processedName()}.`;

        }

        return `${subject.processedName()} doesn't have a ${this.name} to give!`;
    }



}