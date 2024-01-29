//https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use


export default class SeededRandom {
  internal_seed: number;
  initial_seed: number;

  constructor(seed: number) {
    this.initial_seed = seed;
    this.internal_seed = seed;
  }

  //default is zero and one, type is inferred to be a number from this
  nextDouble = (min = 0, max: number = 1) => {
    this.internal_seed = (this.internal_seed * 1664525 + 1013904223) % 4294967296;
    const rnd = this.internal_seed / 4294967296;
    return min + rnd * (max - min);
  }

  getRandomNumberBetween = (min: number, max: number) => {
    return Math.floor(this.nextDouble() * (max - min + 1)) + min;
  }

  pickFrom = (array: any[]) => {
    return array[this.getRandomNumberBetween(0, array.length - 1)];
  }

  shuffle = (array: any[]) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(this.nextDouble() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

