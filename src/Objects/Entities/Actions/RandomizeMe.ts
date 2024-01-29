import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";


export class RandomizeMe extends Action {



    applyAction = (beat: AiBeat) => {
        const current_room = beat.owner?.room;
        if (!current_room || !beat.owner) {
            return "";
        }
        beat.owner.randomize();
        return "Randomizes.";
    }

}