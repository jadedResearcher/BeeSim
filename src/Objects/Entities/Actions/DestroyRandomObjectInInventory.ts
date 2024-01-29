
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { OBFUSCATION, PHILOSOPHY } from "../../ThemeStorage";


export class DestroyRandomObjectInInventory extends Action { //lawsuit

    recognizedCommands: string[] = []

    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }

        const targets = beat.targets;
        const target = targets[0];
        const item = subject.rand.pickFrom(subject.inventory);
        const theme = subject.rand.pickFrom(item.themes);
        beat.itemName = item.name;
        subject.destroyObject(item);

        return `${target.processedName()} destroys the ${item.name} and talks about philosophy`;

    }

}