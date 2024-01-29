import SeededRandom from '../Utils/SeededRandom';
import * as Stat from './Stat';
import * as ThemeStorage from './ThemeStorage';
import { Memory } from './Memory';
import { AiBeat } from './Entities/StoryBeats/BaseBeat';

interface ThemeMap {
    [details: string]: Theme;
}

interface PossibilitiesListMap {
    [details: string]: any[];
}


//auto populated by creating themes. 
export const all_themes: ThemeMap = {};

export class Theme {
    //TODO refactor solo/first/second/super to instead by parts of speect like
    //TODO ing, 's, ed, etc.
    key: string;
    stats: Stat.StatMap = {};

    /*will look like this: 
    nouns: [],
    adjs: [],
    insults: [],
    compliments: [],
    etc etc
    */
    string_possibilities: PossibilitiesListMap;
    beats: AiBeat[]; //rooms use these
    personal_beats: AiBeat[]; //quotidians  use these

    memories: Memory[];
    opinions: ThemeStorage.ThemePossibilitiesNumberMap;

    tier: number;


    constructor(key: string, tier: number, stats: Stat.StatMap, string_possibilities: PossibilitiesListMap, opinions: ThemeStorage.ThemePossibilitiesNumberMap, memories: Memory[], beats: AiBeat[], personal_beats: AiBeat[]) {
        this.key = key;
        this.tier = tier;
        this.initStats(stats);
        this.string_possibilities = string_possibilities;
        this.memories = memories;
        this.opinions = opinions;
        all_themes[key] = this;
        this.personal_beats = personal_beats;
        this.beats = beats;
    }

    getOpinionOfTheme = (key: string) => {
        if (!this.opinions) {
            return 0;
        }
        if (key in this.opinions) {
            return this.opinions[key];
        }
        return 0;
    }

    pickPossibilityFor = (rand: SeededRandom, key: string) => {
        return rand.pickFrom(this.getPossibilitiesFor(key));
    }

    //takes in things like noun, adj, insult etc etc
    getPossibilitiesFor = (key: string) => {
        if (!this.string_possibilities) {
            return ["[ERROR: DATA NOT FOUND]"];
        }
        if ((key in this.string_possibilities) && this.string_possibilities[key]) {
            return this.string_possibilities[key];
        } else {
            //console.error(`[ERROR: ${key} NOT FOUND ]`, this.string_possibilities);
            return [`[ERROR: ${key} NOT FOUND]`];
        }
    }

    initializeIfNecessary = (tier: number) => {
        if (!this.tier || this.tier === 0) {
            this.tier = tier;
        }
    }

    initStats = (stats: Stat.StatMap) => {
        for (const key of Object.keys(stats)) {
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.key] = skill;
        }
    }

    debug = () => {
        console.log("debug theme");
    }

    myOpinionOnThemes = (themes: Theme[]) => {
        let ret = 0;
        for (let theme of themes) {
            ret += this.getOpinionOfTheme(theme.key.toUpperCase());
        }
        return ret;
    }

}

export const aggregateOpinionsOnThemes = (judgingThemes: Theme[], judgedThemes: Theme[]) => {
    let ret = 0;
    for (let theme of judgingThemes) {
        ret += theme.myOpinionOnThemes(judgedThemes);
    }
    return ret;
}

export const keysToThemes = (theme_keys: string[]) => {
    let themes: Theme[] = [];
    for (let theme of theme_keys) {
        themes.push(all_themes[theme]);
    }
    return themes;
}

//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
export function initThemes() {
    //TODO eventually have each of these maps be a separate json file by key
    ThemeStorage.initThemes();
    ThemeStorage.checkIfAllKeysPresent();
    for (let key of ThemeStorage.keys) {
        const string_possibilities: PossibilitiesListMap = {};
        string_possibilities[ThemeStorage.PERSON] = ThemeStorage.person_posibilities[key];
        string_possibilities[ThemeStorage.LOCATION] = ThemeStorage.location_possibilities[key];
        string_possibilities[ThemeStorage.OBJECT] = ThemeStorage.object_possibilities[key];

        string_possibilities[ThemeStorage.ADJ] = ThemeStorage.adj_possibilities[key];
        string_possibilities[ThemeStorage.SUPERMOVE] = ThemeStorage.super_name_possibilities_map[key];
        string_possibilities[ThemeStorage.COMPLIMENT] = ThemeStorage.compliment_possibilities[key];
        string_possibilities[ThemeStorage.INSULT] = ThemeStorage.insult_possibilities[key];
        string_possibilities[ThemeStorage.MENU] = ThemeStorage.menu_options[key];
        string_possibilities[ThemeStorage.CHILDBACKSTORY] = ThemeStorage.child_backstories[key];
        string_possibilities[ThemeStorage.GENERALBACKSTORY] = ThemeStorage.general_backstories[key];
        string_possibilities[ThemeStorage.MIRACLE] = ThemeStorage.miracles[key];
        string_possibilities[ThemeStorage.SONG] = ThemeStorage.song_possibilities[key];
        string_possibilities[ThemeStorage.MONSTER_DESC] = ThemeStorage.monster_desc[key];
        string_possibilities[ThemeStorage.PHILOSOPHY] = ThemeStorage.philosophy[key];
        string_possibilities[ThemeStorage.LOC_DESC] = ThemeStorage.loc_desc[key];
        string_possibilities[ThemeStorage.SMELL] = ThemeStorage.smell_possibilities[key];
        string_possibilities[ThemeStorage.TASTE] = ThemeStorage.taste_possibilities[key];
        string_possibilities[ThemeStorage.SOUND] = ThemeStorage.sound_possibilities[key];
        string_possibilities[ThemeStorage.FEELING] = ThemeStorage.feeling_possibilities[key];
        string_possibilities[ThemeStorage.EFFECTS] = ThemeStorage.effect_possibilities[key];
        string_possibilities[ThemeStorage.WALL] = ThemeStorage.wall_possibilities[key];
        string_possibilities[ThemeStorage.FLOOR] = ThemeStorage.floor_possibilities[key];
        string_possibilities[ThemeStorage.WALLFOREGROUND] = ThemeStorage.wall_foregrounds[key];
        string_possibilities[ThemeStorage.WALLBACKGROUND] = ThemeStorage.wall_backgrounds[key];
        string_possibilities[ThemeStorage.FLOORBACKGROUND] = ThemeStorage.floor_backgrounds[key];
        string_possibilities[ThemeStorage.FLOORFOREGROUND] = ThemeStorage.floor_foregrounds[key];
        string_possibilities[ThemeStorage.SPRITES] = ThemeStorage.sprite_possibilities[key];
        string_possibilities[ThemeStorage.FILTERS] = ThemeStorage.filter_possibilities[key];

        const opinions = ThemeStorage.theme_opinions[key];
        const beats =  ThemeStorage.beat_list[key];
        const personal_beats =  ThemeStorage.personal_beat_list[key];

        const memories = ThemeStorage.memories[key] ? ThemeStorage.memories[key] : [];
        new Theme(key, 0, Stat.WrapStatsToStatMap(ThemeStorage.stats_map[key]), string_possibilities, opinions, memories, beats, personal_beats);
    }



}


