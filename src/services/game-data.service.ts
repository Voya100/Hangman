import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/toPromise';

import { WordRandomizerService } from './word-randomizer.service'

// Contains all game related data such as game status and statistics

@Injectable()
export class GameDataService {

  // Statistics
  victories: number = 0;
  losses: number = 0;

  // Other
    max_guesses: number = 9;

  // Game status
  victory: boolean = false;
  guesses: string[] = [];
  guesses_left: number = this.max_guesses;
  word: string = "";
  word_guess:string = "";

  

  constructor(private storage: Storage,
              private wordRandomizer: WordRandomizerService) { }

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

  reset_statistics(){
    this.victories = 0;
    this.losses = 0;
    this.storage.set('victories', 0);
    this.storage.set('losses', 0);
  }

  
}