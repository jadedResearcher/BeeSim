
export class Relationship  {
    title: string;
    amount: number;
    positiveFlavor: string;
    negativeFlavor: string;
    importantFlavor: string;
    romanticFlavor: string;
    officialFlavor: string;

    important= false; //you can be Important but not romantic
    romantic  = false; //you can be Romantic but not important

    official = false; //do both parties agree that This Is A Thing (whatever flavor it is?)

    constructor(title: string,amount: number,positiveFlavor: string, negativeFlavor: string, importantFlavor: string, romanticFlavor:string, officialFlavor:string, important=false, romantic=false, official=false ){
        console.log("JR NOTE: making a new relationship", title, amount);
        this.amount = amount;
        this.positiveFlavor = positiveFlavor;
        this.negativeFlavor = negativeFlavor;
        this.importantFlavor = importantFlavor;
        this.romanticFlavor = romanticFlavor;
        this.officialFlavor = officialFlavor;
        this.romantic = romantic;
        this.important = important;
        this.official = official;
        this.title  = title;
    }

    toString = ()=>{
        let ret = "";
        this.amount > 0? ret += this.positiveFlavor: ret += this.negativeFlavor;
        this.important? ret += " " + this.importantFlavor: null;
        this.romantic? ret += " " + this.romanticFlavor: null;
        this.official? ret += " " + this.official: null;

        return ret;
    }

    //pass in absolute value
    strengthen = (value: number, likeMultiplier: number)=>{
        this.amount += value * likeMultiplier;
    }

    //pass in absolute value
    weaken = (value: number, dislikeMultiplier: number)=>{
        this.amount += value * dislikeMultiplier;
    }

    //pass in absolute value
    //takes in a value and then adds it to the amount (if the amount is positive) or subtracts it (if the amount is negative)
    //so if you pass a postitive number in it'll INCREASE whatever your feelings are, in whatever direction they are trending
    //and if you pass a negative number in (better to just use de_escalate) it'll DECRASE whatever your feelings are, in the opposite of whatever direction they are trendng
    intensify = (value: number, likeMultiplier: number, dislikeMultiplier: number)=>{
        if(this.amount < 0){ //if you have no opinion about someone, give them the benefit of the doubt
            this.amount += -1* value * dislikeMultiplier;
        }else{
            this.amount += value * likeMultiplier;
        }
    }

    //pass in absolute value
    //opposite of intensify, it goes in the OPPOSITE direction its trending int .however, if you're zero currently, no changes
    de_escalate = (value: number, likeMultiplier: number, dislikeMultiplier: number)=>{
        if(this.amount === 0){
            return;
        }
        if(this.amount < 0){ //if you have no opinion about someone, give them the benefit of the doubt
            this.amount += value * likeMultiplier;
        }else{
            this.amount += -1 * value * dislikeMultiplier;
        }
    }


}