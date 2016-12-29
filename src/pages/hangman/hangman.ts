import { Component, OnInit } from '@angular/core';

import {AlertController, NavController, LoadingController } from 'ionic-angular';

import { GameDataService } from '../../services/game-data.service'
import { SettingsService } from '../../services/settings.service'
import { WordRandomizerService } from '../../services/word-randomizer.service'

@Component({
  templateUrl: 'hangman.html'
})
export class HangmanPage implements OnInit {

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController, 
              private loader: LoadingController,
              private data: GameDataService,
              private settings: SettingsService,
              private randomWord: WordRandomizerService) {
  }

  ngOnInit() { 
    // Reset if app is opened
    if(this.data.word == ""){
      this.reset();
    }else if(this.data.language !== this.settings.language){
      // Language has been changed, word needs to be reset
      this.data.language = this.settings.language;
      this.reset();
    }
  }

  // Guesses an alphabet
  // If alphabet is in the word, more of the word is revealed.
  // Otherwise guesses are reduced.
  // Game ends once word has been guessed or all guesses have been used.
  guess(a){
    if(this.data.guess(a)){
        this.gameOver();
    }
  }

  // Resets the game (gives a new word)
  reset(){
    let loading = this.loader.create({
      content: 'Loading words...'
    })
    loading.present();

    this.data.reset_game().then(() => loading.dismiss());
  }

  // Gives game over screen and adds victory/loss
  gameOver(){
    let gameOverScreen = this.alertCtrl.create({
      title: this.data.victory ? this.settings.lang.victory : this.settings.lang.victory,
      message: this.data.victory ? this.settings.lang.victory_message + this.data.word + "." : 
                                   this.settings.lang.game_over_message + this.data.word + ".",
      buttons: [
        {
          text: this.settings.lang.play_again,
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