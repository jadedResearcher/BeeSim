
import {  Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIM_SCRIPT } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";


//do you want to be a Thing (whether romantic or platonic?)
export class ConsiderWhetherTargetIsOfficialToYou extends Action {
    importantReturn = true;


    recognizedCommands: string[] = [];

    applyAction = (beat: AiBeat)=>{
        const current_room = beat.owner?.room;
        if(!current_room){
            return "";
        }
        const subject = beat.owner;
        let target = beat.targets[0];

        if(!subject || !target || !(target instanceof Quotidian)){
            return "";
        }
        const howIFeelAboutYou = subject.getRelationshipWith(target);
        const howYouFeelAboutMe = target.getRelationshipWith(subject);

        if(!howIFeelAboutYou?.important || !howIFeelAboutYou?.romantic){
            return ``//nothing terribly special is going on;
        }

        
        if(!howYouFeelAboutMe?.important || !howYouFeelAboutMe?.romantic){
            subject.stabilityLevel += -1 * subject.instablityRate; //ria might crack from this
            return `${subject.processedName()} confesses that they want to spend the rest of their life together with ${TARGETSTRING}. ${SUBJECT_HE_SCRIPT} apologizes, but doesn't feel the same way.`;
        }
        

        
        if(subject.rand.nextDouble() < .5){
            subject.realizeIWantToSpendMyLifeWithTarget(target);
            subject.stabilityLevel += subject.instablityRate; //its such a relief

            return `${subject.processedName()} explains how important ${TARGETSTRING} is to ${SUBJECT_HIM_SCRIPT} and ${TARGETSTRING} agrees!  They immediately begin planning to move in together while applause is heard from the air itself.`;
        }
        return "";

    }

}