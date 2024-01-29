import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { AiBeat } from "../StoryBeats/BaseBeat";


export class RandomizeEveryone extends Action {



    applyAction = (beat: AiBeat) => {
        const current_room = beat.owner?.room;
        if (!current_room) {
            return "";
        }
        let ret = "";
        for (let target of current_room.blorbos) {
            if (target instanceof Quotidian) {
                target.randomize();
                ret +=  `${target.processedName()} gains a different soul. `;

            }

        }
        return ret;
    }

}