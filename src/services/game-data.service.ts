import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/toPromise';

import { SettingsService } from './settings.service'
import { WordRandomizerService } from './word-randomizer.service'

// Contains all game related data such as game status and statistics

@Injectable()
export class GameDataService {

  // Game status
  victory: boolean = false;
  guesses: string[] = [];
  guesses_left: number;
  word: string = "";
  word_guess:string = "";
  dictionary: string;

  // Statistics
  private statistics = {
    victories: 0,
    losses: 0
  }

  victories(){
    return this.statistics.victories;
  }
  losses(){
    return this.statistics.losses;
  }

  constructor(private storage: Storage,
              private settings: SettingsService,
              private wordRandomizer: WordRandomizerService) { 
    this.guesses_left = settings.max_guesses;
    this.dictionary = settings.settings.dictionary;
  }

  // Initialises statics from local memory and set current dictionary
  init(){
    this.storage.get('statistics').then((stats) => {
      if(stats !== null){
        this.statistics = stats;
      }
    })
    this.dictionary = this.settings.settings.dictionary;
  }

  // Adds a victory and saves statistics
  add_victory(){
    this.statistics.victories++;
    this.storage.set('statistics', this.statistics);
  }

  // Adds a loss and saves statistics
  add_loss(){
    this.statistics.losses++;
    this.storage.set('statistics', this.statistics);
  }

  // Guesses a character. False guesses reduce amount of guesses.
  // Returns true if game ends.
  guess(a){
    this.guesses.push(a);
    if(this.word.indexOf(a) > -1){
      return this.reveal_word();
    }else{
      // Harder difficulties have fewer guesses
      if(this.guesses_left == this.settings.max_guesses){
        this.guesses_left -= this.settings.settings.difficulty;
      }

      this.guesses_left -= 1;
      if(this.guesses_left <= 0){
        this.victory = false;
        return true;
      }
      return false;
    }
  }

  // Resets game by getting a new word and re-initialising variables
  reset_game(){
    return this.wordRandomizer.getWord().then((word) =>{
      this.word = word;
      this.guesses = [];
      this.guesses_left = this.settings.max_guesses;
      this.reveal_word();
    });
  }

  // Resets statics information and saves changes to memory
  reset_statistics(){
    this.statistics.victories = 0;
    this.statistics.losses = 0;
    this.storage.set('statistics', this.statistics);
  }
  
  // Reveals characters in the word which are guessed correctly
  // If a character isn't in the alphabet list, it is shown automatically (dashes and foreign characters, as an example)
  // If revealed word matches original word, returns true
  reveal_word(){
    let reveal = "";
    for(var i=0; i<this.word.length; i++){
      // Character is in the word or it isn't in the alphabet
      if(this.guesses.indexOf(this.word[i]) > -1 || this.settings.alphabet.indexOf(this.word[i]) == -1){
        reveal += this.word[i];
      }else{
        reveal += "_";
      }
    }
    this.word_guess = reveal;
    // Victory
    if(reveal == this.word){
      this.victory = true;
      return true;
    }
    return false;
  }

  
}