import { Component, OnInit } from '@angular/core';

import {AlertController, NavController, LoadingController } from 'ionic-angular';

import { WordRandomizerService } from '../../services/word-randomizer.service'

@Component({
  templateUrl: 'hangman.html'
})
export class HangmanPage implements OnInit {

  // Settings
  max_guesses: number = 9;
  alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  
  victory = false;
  guesses= [];
  guesses_left: number = this.max_guesses;
  word = "";
  word_guess = "";


  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController, 
              private loader: LoadingController,
              private randomWord: WordRandomizerService) {

  }

  ngOnInit() { 
    this.reset();
  }

  // Reveals characters in the word which are guessed correctly
  // If a character isn't in the alphabet list, it is shown automatically (dashes and foreign characters, as an example)
  // If revealed word matches original word, game ends
  reveal_word(){
    let reveal = "";
    for(var i=0; i<this.word.length; i++){
      // Character is in the word or it isn't in the alphabet
      if(this.guesses.indexOf(this.word[i]) > -1 || this.alphabet.indexOf(this.word[i]) == -1){
        reveal += this.word[i];
      }else{
        reveal += "_";
      }
    }
    this.word_guess = reveal;
    // Victory
    if(reveal == this.word){
      this.victory = true;
      this.gameOver();
    }
  }

  // Guesses an alphabet
  // If alphabet is in the word, more of the word is revealed
  // Otherwise guesses are reduced, and game may end.
  guess(a){
    this.guesses.push(a);
    if(this.word.indexOf(a) > -1){
      this.reveal_word();
    }else{
      this.guesses_left -= 1;
      if(this.guesses_left <= 0){
        this.victory = false;
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
      this.word = word;
      this.guesses = [];
      this.guesses_left = this.max_guesses;
      this.reveal_word();
      loading.dismiss();
    });
  }

  gameOver(){
    let gameOverScreen = this.alertCtrl.create({
      title: this.victory ? "Victory!" : "Game over!",
      message: this.victory ? "You guessed correctly, the right word was " + this.word + "." : 
                  "You guessed wrong too many times and you were hung.<br><br>The right answer would have been " + this.word + ".",
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
    gameOverScreen.present();
}

}