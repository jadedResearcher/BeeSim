import { distanceWithinRadius } from "../../../Utils/misc";
import { PhysicalObject } from "../../PhysicalObject";
import { Quotidian } from "../Blorbos/Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export  class TargetIsBreeching extends TargetFilter{

   toString = ()=>{
       //format this like it might start with either because or and
       return `${TARGETSTRING} is ${this.invert?"not":""}  is breaching`;
   }

   applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject)=>{
       let targetLocked = false;
       if(!owner.owner){
           console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
           return null;
       }
       if(target instanceof Quotidian){
        if(target.breaching){
            targetLocked= true;
        }
       }


        if (targetLocked) {
            return this.invert? null:  target;
        } else {
            return this.invert? target:  null;
        }
   }

   
}