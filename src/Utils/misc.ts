export const sleep = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const createElementWithIdAndParent = (eleName: string, parent: HTMLElement, id?: string, className?: string) => {
    const ele = createElementWithId(eleName, id, className);
    parent.append(ele);
    return ele;
}

export const createElementWithId = (eleName: string, id?: string, className?: string) => {
    const ele = document.createElement(eleName);
    if (id) {
        ele.id = id;
    }
    if (className) {
        ele.className = className;
    }
    return ele;

}

export const getElementCenterPoint = (ele: HTMLElement)=>{
    const rect = ele.getBoundingClientRect()
    return {x: rect.x+rect.width/2, y: rect.y+rect.height/2}
}

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
    const first = (x1 - x2) ** 2;
    const second = (y1 - y2) ** 2;
    return (first + second) ** 0.5
}

export const distanceWithinRadius = (radius: number, x1: number, y1: number, x2: number, y2: number) => {
    return distance(x1, y1, x2, y2) < radius;
}

export const withinY = (myY: number, objectY: number, objectHeight: number) => {
    return myY > objectY && myY < objectY + objectHeight;
}

export const withinX = (myX: number, objectX: number, objectWidth: number) => {
    return myX > objectX && myX < objectX + objectWidth;
}

export const boundingBoxesIntersect = (rect1: DOMRect, rect2: DOMRect)=>{
    return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      );
}

export const pointWithinBoundingBox = (myX: number, myY: number, objectX: number, objectY: number, objectWidth: number, objectHeight: number) => {

    return withinX(myX, objectX, objectWidth) && withinY(myY, objectY, objectHeight);
}


/***
 * TODO
 * 
 * Do you accept everything that will happen from now on?
Yes
Yes
Yes
Yes
Yes
Yes
Why are you stuck here?
To find out why
To prove them wrong
To make them proud
I’ve always been here
I don’t have anywhere else to go
I thought it would be funny
Pick a color
Red
Yellow
White
Black
Green
Orange
Purple
Pick a place to be in.
A soft cloud, overlooking the world below. A s 
Pick a place to be.
A dour swamp, overgrown with flora. Everything dies within you. When it does, you will die as well.
An endless expanse, with pillars as tall as mountains looming all around you. They contain unspeakable knowledge for those who dare to read. They are your gift to them.
An unassuming office building in the metropolis. People clock in to work inside you. They never clock out again. You will live forever.
A dark forest, illuminated only by the gaze of the moon. The deeper they go, the stranger you become.
A dizzying vortex, where past, present, and future blend into noise. You stare lovingly at them, hoping they’ll stare back. 
Pick something to leave behind.
My memories. It all hurts so much.
My purpose. It doesn’t matter anymore.
My friends. 
My family. They can't find me now.
Which of these song lyrics speak to you?
You know you used to shine so bright// Was that all reflected light? //Were you just a satellite?
Aristocrat, tip your hat and break your mother's heart // And when the sun comes up // You'll find a brand new god
And knowing we created time and this grand theory of an end // Well, then it's really just a theory, maybe things have always been
We're all just skeletons // Just joining the fight for the adrenaline
At first, I had bragged and boasted a lot, but now // Saying "no" is also an expression of fondness
I thought that you were a rose and let you lay in my bed // But you made a home beneath my skin
Pick one of these words:
Obfuscation
Vestige
Intransigent
Extricate
Parlay
Misbegotten
Do you still hear them?


Do you still go on?
Yes
No
What do you want out of it all?
You find a package on your doorstep from a friend who has gone missing. It has their diary on it. You have no way to confirm who sent this to you. Do you still read it?
Do you like Zampanio??? :) :) :)
Say, you get your title. Do you deserve it?
Pick a limb:
Arms 
Legs
Wandering the maze, you find a room full of photographs of people. Who are they?
What is a minotaur?
What is the purpose of a maze?
Pick a cryptid:
Do you still go on?
What do you think makes something valuable?
Have you remembered to hydrate?
You have a chance- just one- to leave the world you reside in. You will forget everything that has ever happened to you, but you know that you will be given a grand purpose for it. Do you still do it?
You receive a call from an unknown number. The caller ID says ‘An Exciting Opportunity’. Do you answer it?
What is your life worth?
What do you think of your family?
What are you, really?
What do you hear when the world is silent?
Do you consider yourself a good person?
Do you still go on?
What do you believe in?
What are your preferred eating utensils?
Do you think of yourself as good with children?
Would you prefer to be right, good, or just?
Do you create, or do you destroy?
If you could live forever, would you?
Do you think something is missing from you?
Is there anyone you miss?
You are a guardsman in front of the castle of your liege. The enemy is approaching, and the peasants are asking for shelter inside the inner walls. However, if you let them in, there is a chance the enemy will infiltrate the castle. Do you open the gate, or push them out?
Do you still go on?
Is the soul real?
Have you hydrated recently?
Do you think the inanimate can feel?
Do you believe in ghosts?
You are a scientist. The android you have made has just killed someone, and you must represent them in court. If you say they’re a person, they must serve whatever sentence they are given. If you say they’re property, you will bear the burden, but you will get to keep them. What do you choose?
Pick a body of water:
You are alone. Do you feel it?
Does love hurt?
What does it feel like to live?
Do you still go on?
You are deep inside the maze. How do you feel?
You will be presented with two paths. You must choose one. You must be quick. Are you ready?
Skin or bone?
Night or day?
Audio or Video?
Sky or sea?
Tea or coffee?
Red or green?
Sword or pen?
Do you still go on?
Have you hydrated recently?
Do you do things for others, or for yourself?
Pick a flower:
Is life an illusion?
What will you be remembered for?
Your friends would describe you as:
It’s been a while. Do you miss them?
What kind of games do you like to play?
Nice.
Do you still go on?
Are you the watcher, or the watched?
You see fire consume what you once called home. How do you feel?
The person you hate the most is at your mercy. Nobody will ever know. What will you do?
You are given the power to end the world. How do you do it?
Is gender real?
Do you prefer fiction, or nonfiction?
Do you think other worlds are real?
What is a story for?
Inside you is a terrible monster. What does it look like?
Do you still go on?
Choose a calling card:
How far would you go to stay alive?
Everyone’s an artist. What are you?
Your hands are bloody. Are you guilty?
They betrayed you. Do you hate them?
You can’t feel hungry anymore; at least not physiologically. Pick a type of hunger.
Hunger of the soul. You’re a flame now, shaped by forward momentum. It doesn’t matter why you are hungry, now. It only matters that you don’t stop.
Hunger of the mind. There is so much more to experience. There is so much more. You can’t help but salivate. You will know it all.
Hunger of the heart. There are so many people in this world. What are their stories? And with the right strings, what will they become? You can’t wait to unravel them.
Hunger. Beyond concept, beyond words. You still eat, but not because you starve. You must consume it all.
Do you regret what you’ve done?
No. They were in my way, and I dealt with them. No more, no less.
No. They were never real, anyway.
A little. It’s like tossing out good food.
Yes. They could’ve been so much more.
Yes. More than anything else.
Do you remember their faces?
Do you remember the reflection of the liquid in your drink? The shape of your food?
They didn’t have any.
He was screaming, mouth agape, his eyes shot open in terror. It came to me, for a second, that I sculpted this. I made him what he was. And it was beautiful.
What is that behind you?
Do you still go on?
It’s almost over. How do you feel?
The end is never the end.
Their echoes came through, for a minute. What are they?
What is the purpose of a title?
Your title will change you. Do you understand that?
We love you. Do you accept it?
What is the purpose of Zampanio?
What is your purpose?
Your body and mind will change to become it. Will you accept this?
Do you understand what you must do now?
It’s over now. What have you become? Be honest, now. They are watching, and they are hungry. If things go as planned, you will understand.
Would you waste your own mind?
Do you transverse mazes clockwise?

 * 
 * 
 */