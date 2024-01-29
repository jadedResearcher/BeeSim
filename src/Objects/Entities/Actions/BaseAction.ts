import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Peewee } from "../Blorbos/Peewee";
import { AiBeat } from "../StoryBeats/BaseBeat";



export class Action{ //lawsuit
    importantReturn = false; //most returns are for debugging only. This isn't. 
    hidden = false; //if its hidden peewee won't suggest it if he has access to it.

    //IMPORTANT. DO NOT TRY TO STORE ANY INFORMAITON INSIDE THIS, OR WHEN A STORY BEAT CLONES ITSELF THERE WILL BE PROBLEMS
    recognizedCommands:string[] = []; //nothing, so its default
//for all fights, if yongki, yongki win


handleProcessingPeeweeInput = (input: string[], peewee: Peewee)=>{
    //MOST actions do nothing here, but if you, for example, need to get some complex nuance in this action
        //we can toss peewees whole input into here and scan it for whatever we care about
    }

    sensePhrase = (room?:Room)=>{
        if(!room){
            return "";
        }
        const smell = room.getRandomThemeConcept(SMELL);
        const taste = room.getRandomThemeConcept(TASTE);
        const sound = room.getRandomThemeConcept(SOUND);

       const phrases = [`You can hear the sound of ${sound} in the distance.`,`The taste of ${taste} floods your mouth.`, `Why does it smell like ${smell} all of a sudden?`];
       if(room.rand.nextDouble() <.5){
           return "";
       }
       return room.rand.pickFrom(phrases);
    }
    applyAction = (beat: AiBeat)=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        return `${beat.owner?.processedName()} stands around doing sweet FA. ${this.sensePhrase(beat.owner?.room)}`;
    }



}