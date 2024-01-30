
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { FEMALE, himPronoun, MALE, Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { ThemeBee } from "../Blorbos/ThemeBee";


export class BreedWithTarget extends Action {


    recognizedCommands: string[] = [];

    breed = (blorbo: Quotidian, owner: Quotidian)=>{
        if (blorbo.name === owner.name || blorbo.room.blorbos.length >13) {
            return;
        }
        const rand = owner.room.rand;
        const maze = owner.room.maze;
        //first, make a new bee with one theme from each parent
        const child =(new ThemeBee(owner.room, [rand.pickFrom(owner.themes), rand.pickFrom(blorbo.themes)], owner.x, owner.y));

        //mutation stat just comes from the randomized bee
        //odds mutation is between 1 and 5. decides how many times to add the child stat
        const breedStat = (parent1Stat:number, parent2Stat:number, mutationStat:number, oddsMutation:number)=>{
            const baseStats = [parent1Stat, parent2Stat];
            for(let i =0; i<=5; i++){
                if(i < oddsMutation){
                    baseStats.push(mutationStat)
                }else{
                    baseStats.push(parent1Stat);
                    baseStats.push(parent2Stat);
                }
            }
            return rand.pickFrom(baseStats);

        }
        //then set its stats to be randomly from one or the other parent
        //with a chance of mutation based on the host parents judgement
        child.fortitude = breedStat(owner.fortitude, blorbo.fortitude, child.fortitude, owner.judgement)
        child.prudence = breedStat(owner.prudence, blorbo.prudence, child.prudence, owner.judgement);
        child.temperance = breedStat(owner.temperance, blorbo.temperance, child.temperance, owner.judgement);
        child.judgement = breedStat(owner.judgement, blorbo.judgement, child.judgement, owner.judgement);
        //then add it to the mazes blorbo list (and this room)
        maze.blorbos.push(child);
        owner.room.blorbos.push(child);
        return child;
    }

    applyAction = (beat: AiBeat) => {
        const current_room = beat.owner?.room;
        if (!current_room || !beat.owner) {
            return "";
        }
        const subject = beat.owner;
        if (!subject) {
            return "";
        }
        for (let target of beat.targets) {
            if (target instanceof Quotidian) {
                const baby = this.breed(target, beat.owner);
                if (baby) {
                    return `${subject.processedName()} has a child with ${TARGETSTRING}. It is ${baby.processedName()}!`;
                }else{
                    return `${subject.processedName()} wants to have a child with ${TARGETSTRING}, but there is no room...`;
                }
            }

        }
        return "";

    }

}