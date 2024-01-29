import { distanceWithinRadius } from "../../../Utils/misc";
import { PhysicalObject } from "../../PhysicalObject";
import { Quotidian } from "../Blorbos/Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export  class TargetStabilityLevelLessThanAmount extends TargetFilter{
    amount:number;
        //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(amount:number, options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}){
        super(options);
        this.amount = amount;
    }

   toString = ()=>{
       //format this like it might start with either because or and
       return `${TARGETSTRING} is ${this.invert?"not":""}  less stable than ${this.amount}}`;
   }

   applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject)=>{
       let targetLocked = false;
       if(!owner.owner){
           console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
           return null;
       }
       if(target instanceof Quotidian){
        if(target.stabilityLevel < this.amount){
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