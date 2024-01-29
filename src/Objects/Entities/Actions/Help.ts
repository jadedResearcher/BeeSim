
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Peewee } from "../Blorbos/Peewee";
import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";

//assume only peewee can look
export class Help extends Action {
    /*
    KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast. 

    const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
    const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
    const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
    //
    const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];

    const listen_euphamemism = ["LISTEN", "HEAR"];
    //oh god why are you TASTING anything here.
    const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
    //should smell either faintly or overpoweringly
    const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
    //should feel weird and fake
    const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
    const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];

    past me is a treasure
    */


    recognizedCommands: string[] = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH","LS","DIR","MAN"];


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }        
        const peewee = subject as Peewee;
        return `To best command Peewee, your base options are ${turnArrayIntoHumanSentence(peewee.possibleActions.filter((i)=>!i.hidden).map((i)=>i.recognizedCommands[0]))}.  <br><br>The vast gulf between your extra-universal eldritch horror and Peewee means that only basic concepts can be transalted.  'go WEST' and 'take blade' or 'give blade devona' work best. <br><br>What things might you see that no other Observer has ever seen in this sprawling simulated maze? If you see something especially entertaining, you should let people know. JR if you can. The Unmarked if you can't. You...DO know what the Unmarked are...don't you?`;
    }



}