import { Component, OnInit } from '@angular/core';

import {AlertController, NavController, LoadingController } from 'ionic-angular';

import { NavBarComponent } from '../../shared/navbar/navbar.component'

import { GameDataService } from '../../services/game-data.service'
import { WordRandomizerService } from '../../services/word-randomizer.service'

@Component({
  templateUrl: 'hangman.html'
})
export class HangmanPage implements OnInit {

  // Settings
  alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController, 
              private loader: LoadingController,
              private data: GameDataService,
              private randomWord: WordRandomizerService) {
  }

  ngOnInit() { 
    if(this.data.word == ""){
      this.reset();
    }
  }

  // Reveals characters in the word which are guessed correctly
  // If a character isn't in the alphabet list, it is shown automatically (dashes and foreign characters, as an example)
  // If revealed word matches original word, game ends
  reveal_word(){
    let reveal = "";
    for(var i=0; i<this.data.word.length; i++){
      // Character is in the word or it isn't in the alphabet
      if(this.data.guesses.indexOf(this.data.word[i]) > -1 || this.alphabet.indexOf(this.data.word[i]) == -1){
        reveal += this.data.word[i];
      }else{
        reveal += "_";
      }
    }
    this.data.word_guess = reveal;
    // Victory
    if(reveal == this.data.word){
      this.data.victory = true;
      this.gameOver();
    }
  }

  // Guesses an alphabet
  // If alphabet is in the word, more of the word is revealed
  // Otherwise guesses are reduced, and game may end.
  guess(a){
    this.data.guesses.push(a);
    if(this.data.word.indexOf(a) > -1){
      this.reveal_word();
    }else{
      this.data.guesses_left -= 1;
      if(this.data.guesses_left <= 0){
        this.data.victory = false;
        this.gameOver();
        console.log("Game over");
      }
    }
  }

  // Resets the game (gives a new word)
  reset(){
    let loading = this.loader.create({
      content: 'Loading words...'
    })
    loading.present();

    this.randomWord.getWord().then((word) =>{
      this.data.word = word;
      this.data.guesses = [];
      this.data.guesses_left = this.data.max_guesses;
      this.reveal_word();
      loading.dismiss();
    });
  }

  gameOver(){
    let gameOverScreen = this.alertCtrl.create({
      title: this.data.victory ? "Victory!" : "Game over!",
      message: this.data.victory ? "You guessed correctly, the right word was " + this.data.word + "." : 
                  "You guessed wrong too many times and you were hung.<br><br>The right answer would have been " + this.data.word + ".",
      buttons: [
        {
          text: 'Play again',
          cssClass: 'game_over_button',
          handler: () => {
            this.reset();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    if(this.data.victory){
      this.data.add_victory();
    }else{
      this.data.add_loss();
    }
    gameOverScreen.present();
}

}