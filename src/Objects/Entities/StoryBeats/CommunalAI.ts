
import { ConsiderWhetherTargetIsImportantToYou } from "../Actions/ConsiderIfIsImportantToMe";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { ConsiderWhetherTargetIsRomanticToYou } from "../Actions/ConsiderIfIsRomantic";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { ILikeTargetMoreThanAmount } from "../TargetFilter/ILikeTargetMoreThanAmount";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetIsImportantToMe } from "../TargetFilter/TargetIsImportantToMe";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIS_SCRIPT } from "./BaseBeat";
import { TargetIsRomanticToMe } from "../TargetFilter/TargetIsRomanticToMe";
import { ConsiderWhetherTargetIsOfficialToYou } from "../Actions/ConsiderIfOfficial";
import { TargetIsOfficialToMe } from "../TargetFilter/TargetIsOfficialToMe";


//JR NOTE: you can pass these to ai beats to debug them better (and not get any other beats spam)
export const debugAiBeat = (beat: AiBeat)=>{
    console.log("JR NOTE: I am a beat to debug", beat)
}

const botherEnemey = new AiBeat(
    `${SUBJECTSTRING}: Annoy ${TARGETSTRING}`,
    [`${SUBJECTSTRING} dedicates a chunk of time to annoying the ever loving shit out of ${TARGETSTRING}. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(-100, {singleTarget: true, invert: true}),new TargetIsImportantToMe({invert: true, singleTarget: true})],
    [new ConsiderWhetherTargetIsImportantToYou()],
    true,
    1000*30,
);
//if they're not already important to me, hang out just as bros
const hangOutWithFriend = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} hang out for a while. They both have a pretty good time. `, `${SUBJECTSTRING} and ${TARGETSTRING} chill for a while. It's nice. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(100, {singleTarget: true}),new TargetIsImportantToMe({invert: true, singleTarget: true})],
    [new ConsiderWhetherTargetIsImportantToYou()],
    true,
    1000*30,
);

const hangOutWithPotentialCrush = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} hang out for a while. They both have a pretty good time. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(100, {singleTarget: true}),new TargetIsRomanticToMe({invert: true, singleTarget: true})],
    [new ConsiderWhetherTargetIsRomanticToYou()],
    true,
    1000*30,
);


//in theory you can make someone a life partner who isn't even important to you, and they were roommates
const hangOutWithPotentialLifePartner = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} spend hours talking together about their hopes and dreams. `,`${SUBJECTSTRING} and ${TARGETSTRING} are really enjoying spending time together. `,`${SUBJECTSTRING} and ${TARGETSTRING} are in a very silly debate together. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(500, {singleTarget: true}),new TargetIsOfficialToMe({invert: true, singleTarget: true})],
    [new ConsiderWhetherTargetIsOfficialToYou()],
    true,
    1000*30,
);

const hangOutWithLifePartner = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} cook meals together. `, `${SUBJECTSTRING} and ${TARGETSTRING} decorate a room together. `,`${SUBJECTSTRING} and ${TARGETSTRING} are cleaning up a little. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(500, {singleTarget: true}),new TargetIsOfficialToMe({singleTarget: true})],
    [],
    true,
    1000*30,
);

const breachIfStabilityDropsEnough = new AiBeat(
    `${SUBJECTSTRING}: Breach`,
    [`${SUBJECTSTRING} has reached ${SUBJECT_HIS_SCRIPT} limit. ${SUBJECT_HE_SCRIPT} have seen too many horrors. More than anyone could possibly bear. ${SUBJECT_HIS_SCRIPT} form begins twisting as they clutch ${SUBJECT_HIS_SCRIPT} head. `],
    [  new TargetStabilityLevelLessThanAmount(0, {singleTarget:true, kMode: true}), new TargetIsBreeching({invert: true,singleTarget:true, kMode: true})],
    [new IncrementMyState("")],
    true,
    1000*30
);

//things like confessing love or breaching if your stability level is low enough
export const communal_ai:AiBeat[] = [breachIfStabilityDropsEnough,hangOutWithFriend,hangOutWithPotentialCrush,hangOutWithPotentialLifePartner,hangOutWithLifePartner,botherEnemey]