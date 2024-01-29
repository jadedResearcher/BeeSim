import { getRandomNumberBetween, pickFrom } from "../../Utils/NonSeededRandUtils";
import { Direction } from "../Entities/Blorbos/Quotidian";

/*
has array of audio files it can switch between in a playlist
makes audio go in and out in terms of volume
subtly messes with speed and pitch, too, if i can manage it
*/
//
export class ChantingEngine {
    baseLocation = "audio/Chant/";
    //JR NOTE: todo , still raw audio, needs cleanup
    //the loops is not a loop
    sources = ["Drone1.mp3", "Drone2Fractal.mp3", "Drone3.mp3"];
    audio = new Audio(this.baseLocation + this.sources[1]);
    tickNum = 0;
    volumeDirection = Direction.UP;

    start = () => {
        this.audio.volume = 0;
        this.audio.loop = true;
        this.audio.play();
        this.tick();
    }

    listen = () => {
        this.volumeDirection = Direction.DOWN;
        this.audio.volume = 1.0;
    }


    tick = () => {
        if (this.audio.paused) {
            return;
        }
        const chance = Math.random();
        if (chance > 0.75) {
            const range = 40;
            this.audio.playbackRate = ((100 + range) - getRandomNumberBetween(0, range)) / 100;
        } else if (chance > 0.25) {
            const proposedVolume = this.audio.volume + ((this.volumeDirection === Direction.UP ? 1 : -1) * (.001 + (this.audio.volume / 10)));
            if (proposedVolume >= 1) {
                this.volumeDirection = Direction.DOWN;
            } else if (proposedVolume <= 0) {
                this.volumeDirection = Direction.UP;
            } else {
                this.audio.volume = proposedVolume;
                if (proposedVolume <= 0.001) {
                    this.volumeDirection = Direction.UP;
                }
            }
        } else if (chance > 0.20) { //5% chance of changing direction on its own
            //prefer going down if you have an option
            if (this.volumeDirection > 0.5) {
                this.volumeDirection = Direction.DOWN;
            }
        }else if(chance<0.01){
            this.audio.src = this.baseLocation  +pickFrom(this.sources);
            this.audio.volume = 0.001;
            this.audio.play();

        }
        setTimeout(this.tick, 1000);

    }

    pause = () => {
        this.audio.pause();
    }

}