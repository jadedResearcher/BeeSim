import { getRandomNumberBetween } from "./NonSeededRandUtils";
import SeededRandom from "./SeededRandom";

//had to grab this for http://eyedolgames.com/Gender/
//chubby-aphrodite has a gender of Zampanio, winner
//krisotf gets a shout out for having the highest possible Gender so far: 1959
//asssiel wins for going to the real gauntlet instead of the sim and being confused for a second it wasn't infinite, love that for them, genuinely. what a unique and fun way to experience this.
//persnickety-peahen wins for their gender being... gender.
//congrats to burrowingbear for unlocking the emotion 'giggling while having anxiety'
//congrats to ploncc for getting the high score of over 18k questions!
//draconic-idolatry broke the page and only the word 'scholar' remains so, enjoy the new gender
//congrats to arimwe for being the first person to getthe special 413 Homestuck  gender
//congrats to bibliotheca-babble-on for getting the oroboros 113 special gender
//congrats to chillypeper for getting the nice 69 special
//congrats to saltayjek004 for getting the dig 13 special
 export const titleCase = (input: string) => {
    const pieces = input.split(" ");
    const ret = [];
    for (let piece of pieces) {
        if (piece[0]) {
            ret.push(replaceStringAt(piece, 0, piece[0].toUpperCase()));
        }
    }
    return ret.join(" ");
}


export const sentenceCase = (input: string) => {
    if (!input.length) {
        return input;
    }
    return replaceStringAt(input, 0, input[0].toUpperCase());
}

export function replaceStringAt(str: string, index: number, character: string) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}

export function stringtoseed(seed: string) {
    var output = 0;
    for (var i = 0, len = seed.length; i < len; i++) {
        output += seed[i].charCodeAt(0)
    }
    return output
}

//https://media.discordapp.net/attachments/468574691087613952/863079687276986388/tumblr_qaosxmi6ET1xf64vf.mp4
//https://en.m.wikipedia.org/wiki/Wordplay_(The_Twilight_Zone)
//takes in a sentence, for each word in it decides if its going to fuck it up today.
//seed_multiplier handles making it so that EVERY instance of the word "dog" is treated the same but each time i ask i might decide dog is changeable vs not
export function domWordMeaningFuckery() {
    const root = document.querySelector('body');
    const seed_multiplier = getRandomNumberBetween(0, 300);
    if (root) {
        const children = root.querySelectorAll("*");
        for (let child of children) {
            const subchildren = child.querySelectorAll("*");
            if (subchildren.length === 0) {
                if (child.textContent) {
                    child.textContent = gaslightWordMeanings(child.textContent, seed_multiplier);
                }
            }
        }
    }

}

//https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
export function checkTime(i: number) {
    let ret = `${i}`;
    if (i < 10) {
        ret = "0" + i;
    }
    return ret;
}

export function checkTimeMS(i: number) {
    let ret = `${i}`;
    if (i < 10) {
        ret = "00" + i;
    } else if (i < 100) {
        ret = "0" + i;
    }
    return ret;
}
export function getTimeString(date: Date) {
    let h = `${date.getHours()}`;
    let m = `${date.getMinutes()}`;
    let s = `${date.getSeconds()}`;
    // add a zero in front of numbers<10
    m = checkTime(date.getMinutes());
    s = checkTime(date.getSeconds());
    return h + ":" + m + ":" + s;
}

export function getTimeStringBuff(date: Date) {
    let m = `${date.getMinutes()}`;
    let s = `${date.getSeconds()}`;
    let ms = `${date.getMilliseconds()}`;

    // add a zero in front of numbers<10
    m = checkTime(date.getMinutes());
    s = checkTime(date.getSeconds());
    ms = checkTimeMS(date.getMilliseconds());

    return + m + ":" + s + ":" + ms;
}

function gaslightWordMeanings(sentence: string, seed_multiplier: number) {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = getWordReplacement(words[i], seed_multiplier)
    }
    return words.join(" ");
}

//takes in a word, turns it into a random seed and if rngesus says so, turns it into another word
function getWordReplacement(word: string, seed_multiplier: number) {
    if (word === "you") {
        return "ya'll";
    }
    const gaslightOptions = ["echidna", "[REDACTED]", "null", "dark", "friendless", "alone", "minotaur", "hunt", "flesh", "changeling", "distortion", "watcher", "filth", "minotaur", "worm", "bug", "gas", "flavor", "evil fox", "lazy dog", "quick fox", "dead fox", "terrible fox", "bad fox", "fox", "untrustworthy fox", "taste", "smell", "feeling", "failure", "fear", "horror", "mistake", "line", "stay", "good dog", "canine", "good boy", "good boi", "bark", "garbage", "curious dog", "squirming dog", "make dog", "dog CODE", "artist", "musician", "programmer", "console", "hacker", "secret", "gaslight", "robot", "dog", "boredom", "corridor", "hallway", "backroom", "labyrinth", "minotaur", "maze", "door", "distortion", "spiral", "gravestone", "dinner", "ThisIsNotABG", "player", "ThisIsNotAGame", "ThisIsNotABlog", "situation", "canada", "bot", "observer", "camera", "watcher", "ThisIsNotAnEye", "ThisIsNotASpiral", "wednesday", "trumpets", "sunflower", "dinosaur"];
    const multiplied_seed = stringtoseed(word.toUpperCase()) * seed_multiplier;
    let chance = .99;
    if ((window as any).megaGasLight) {
        chance = 0.90;
    }
    let rand = new SeededRandom(multiplied_seed);
    if (rand.nextDouble() > chance) {
        const seed = stringtoseed(word.toUpperCase());
        let rand2 = new SeededRandom(seed);
        let ret = rand2.pickFrom(gaslightOptions);
        if (word[0] === word[0].toUpperCase()) {
            ret = titleCase(ret);
        }
        return ret;
    }
    return word;
}

//hate
//https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
export function isNumeric(str: number) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export //http://jsfiddle.net/JKirchartz/wwckP/    horrorterror html stuff
    var Zalgo = {
        chars: [
            [ /* up */
                '\u030d', /*     ̍     */
                '\u030e', /*     ̎     */
                '\u0304', /*     ̄     */
                '\u0305', /*     ̅     */
                '\u033f', /*     ̿     */
                '\u0311', /*     ̑     */
                '\u0306', /*     ̆     */
                '\u0310', /*     ̐     */
                '\u0352', /*     ͒     */
                '\u0357', /*     ͗     */
                '\u0351', /*     ͑     */
                '\u0307', /*     ̇     */
                '\u0308', /*     ̈     */
                '\u030a', /*     ̊     */
                '\u0342', /*     ͂     */
                '\u0343', /*     ̓     */
                '\u0344', /*     ̈́     */
                '\u034a', /*     ͊     */
                '\u034b', /*     ͋     */
                '\u034c', /*     ͌     */
                '\u0303', /*     ̃     */
                '\u0302', /*     ̂     */
                '\u030c', /*     ̌     */
                '\u0350', /*     ͐     */
                '\u0300', /*     ̀     */
                '\u0301', /*     ́     */
                '\u030b', /*     ̋     */
                '\u030f', /*     ̏     */
                '\u0312', /*     ̒     */
                '\u0313', /*     ̓     */
                '\u0314', /*     ̔     */
                '\u033d', /*     ̽     */
                '\u0309', /*     ̉     */
                '\u0363', /*     ͣ     */
                '\u0364', /*     ͤ     */
                '\u0365', /*     ͥ     */
                '\u0366', /*     ͦ     */
                '\u0367', /*     ͧ     */
                '\u0368', /*     ͨ     */
                '\u0369', /*     ͩ     */
                '\u036a', /*     ͪ     */
                '\u036b', /*     ͫ     */
                '\u036c', /*     ͬ     */
                '\u036d', /*     ͭ     */
                '\u036e', /*     ͮ     */
                '\u036f', /*     ͯ     */
                '\u033e', /*     ̾     */
                '\u035b', /*     ͛     */
                '\u0346', /*     ͆     */
                '\u031a'  /*     ̚     */
            ],
            [ /* down */
                '\u0316', /*     ̖     */
                '\u0317', /*     ̗     */
                '\u0318', /*     ̘     */
                '\u0319', /*     ̙     */
                '\u031c', /*     ̜     */
                '\u031d', /*     ̝     */
                '\u031e', /*     ̞     */
                '\u031f', /*     ̟     */
                '\u0320', /*     ̠     */
                '\u0324', /*     ̤     */
                '\u0325', /*     ̥     */
                '\u0326', /*     ̦     */
                '\u0329', /*     ̩     */
                '\u032a', /*     ̪     */
                '\u032b', /*     ̫     */
                '\u032c', /*     ̬     */
                '\u032d', /*     ̭     */
                '\u032e', /*     ̮     */
                '\u032f', /*     ̯     */
                '\u0330', /*     ̰     */
                '\u0331', /*     ̱     */
                '\u0332', /*     ̲     */
                '\u0333', /*     ̳     */
                '\u0339', /*     ̹     */
                '\u033a', /*     ̺     */
                '\u033b', /*     ̻     */
                '\u033c', /*     ̼     */
                '\u0345', /*     ͅ     */
                '\u0347', /*     ͇     */
                '\u0348', /*     ͈     */
                '\u0349', /*     ͉     */
                '\u034d', /*     ͍     */
                '\u034e', /*     ͎     */
                '\u0353', /*     ͓     */
                '\u0354', /*     ͔     */
                '\u0355', /*     ͕     */
                '\u0356', /*     ͖     */
                '\u0359', /*     ͙     */
                '\u035a', /*     ͚     */
                '\u0323'  /*     ̣     */
            ],
            [ /* mid */
                '\u0315', /*     ̕     */
                '\u031b', /*     ̛     */
                '\u0340', /*     ̀     */
                '\u0341', /*     ́     */
                '\u0358', /*     ͘     */
                '\u0321', /*     ̡     */
                '\u0322', /*     ̢     */
                '\u0327', /*     ̧     */
                '\u0328', /*     ̨     */
                '\u0334', /*     ̴     */
                '\u0335', /*     ̵     */
                '\u0336', /*     ̶     */
                '\u034f', /*     ͏     */
                '\u035c', /*     ͜     */
                '\u035d', /*     ͝     */
                '\u035e', /*     ͞     */
                '\u035f', /*     ͟     */
                '\u0360', /*     ͠     */
                '\u0362', /*     ͢     */
                '\u0338', /*     ̸     */
                '\u0337', /*     ̷      */
                '\u0361', /*     ͡     */
                '\u0489' /*     ҉_     */
            ]]

        ,
        random: function (len: any) {
            if (len === 1) return 0;
            return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
        },
        generate: function (str: any) {
            var str_arr = str.split(''),
                output = str_arr.map(function (a: any) {
                    if (a === " ") return a;
                    for (var i = 0, l = Zalgo.random(16);
                        i < l; i++) {
                        var rand = Zalgo.random(3);
                        a += Zalgo.chars[rand][
                            Zalgo.random(Zalgo.chars[rand].length)
                        ];
                    }
                    return a;
                });
            return output.join('');
        }
    };