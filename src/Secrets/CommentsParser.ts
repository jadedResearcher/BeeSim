


/*
You can really tell how much I enjoyed the Debug Glasses in the [Title Pending] game.

God it really was so Zampanio wasn't it?

The idea of being trapped, not in a narrative unrelated to you, but in the game you yourself are making. Trapped in a dev cycle that you thought would be a month or two, that's stretching out to months and months and you can't find any playtesters even as your scope creeps and creeps and no one is helping you and .... 


Well.

Yeah.

[Title Pending] really hit for me.
*/
//https://stackoverflow.com/questions/5989315/regex-for-match-replacing-javascript-comments-both-multiline-and-inline was key
export const parseComments= (fileLocation: string)=>{
    const httpGet = (theUrl: string) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
      }
    //const url = 'dist/bundle.js';
    const resp = httpGet(fileLocation);
    const fullComments = resp.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);
    let ret:string[] = [];
    if(!fullComments){
        return ret;
    }
    for(let item of fullComments){
        const banned = ["/******/","/***/","/* harmony export */","/* binding */"]
        if(!banned.includes(item)){
            ret.push(item);
        }
    }
    return ret;
}

/*
Actually, no, lets talk about this.  

[Title Pending] inspired me to use my own comments in my own game as content, not for wastes, not for those looking beneath the surface, but to rip it, kicking and screaming into the Light.

I've always, ALWAYS rambled and rambled in my comments. And those that See it seem to appreciate it (hi!). 

But it's always a layer denied to those who tread carefully on the surface?

And this idea, of flipping the script, of turning the unseen into the can't-miss (well, only if you realize you can pick items up and realize certain items are different)...

POINT is...

I like it. 

And I like that if you tread only on the surface you can still SEE these, but completely divorced of context they're almost impossible to parse.

Misleading through piles upon piles of information is p much the core of Zampanio I'm trying to capture, afterall :) :) :)
*/