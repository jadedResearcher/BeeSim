
import { Action } from "../Actions/BaseAction";
import { TargetFilter } from "../TargetFilter/baseFilter";
import { AiBeat } from "./BaseBeat";

export class FriendlyAiBeat extends  AiBeat {
    startingText:string;
    endingText:string;
    truthText: string;
    
    constructor(startingText: string, endingText: string, truthText: string,triggers: TargetFilter[], actions: Action[]) {
        super("FRIEND:",[],triggers, actions, false);
        this.startingText  = startingText;
        this.endingText = endingText;
        this.truthText = truthText;
    }
}