import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/toPromise';

import { SettingsService } from './settings.service'
import { WordRandomizerService } from './word-randomizer.service'

// Contains all game related data such as game status and statistics

@Injectable()
export class GameDataService {

  // Statistics
  victories: number = 0;
  losses: number = 0;

  // Game status
  victory: boolean = false;
  guesses: string[] = [];
  guesses_left: number;
  word: string = "";
  word_guess:string = "";

  

  constructor(private storage: Storage,
              private settings: SettingsService,
              private wordRandomizer: WordRandomizerService) { 
                this.guesses_left = settings.max_guesses;
              }

  init(){
    this.storage.get('victories').then((value) => {
      this.victories = value;
    })
    this.storage.get('losses').then((value) => {
      this.losses = value;
    })
  }


  add_victory(){
    this.victories++;
    this.storage.set('victories', this.victories);
  }

  add_loss(){
    this.losses++;
    this.storage.set('losses', this.losses);
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
        this.guesses_left -= this.settings.difficulty;
      }

      this.guesses_left -= 1;
      if(this.guesses_left <= 0){
        this.victory = false;
        console.log("Game over");
        return true;
      }
    }
  }

  reset_game(){
    return this.wordRandomizer.getWord().then((word) =>{
      this.word = word;
      this.guesses = [];
      this.guesses_left = this.settings.max_guesses;
      this.reveal_word();
    });
  }

  reset_statistics(){
    this.victories = 0;
    this.losses = 0;
    this.storage.set('victories', 0);
    this.storage.set('losses', 0);
  }
  
  // Reveals characters in the word which are guessed correctly
  // If a character isn't in the alphabet list, it is shown automatically (dashes and foreign characters, as an example)
  // If revealed word matches original word, returns true
  reveal_word(){
    let reveal = "";
    for(var i=0; i<this.word.length; i++){
      // Character is in the word or it isn't in the alphabet
      if(this.guesses.indexOf(this.word[i]) > -1 || this.settings.lang.alphabet.indexOf(this.word[i]) == -1){
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