import { Component, OnInit } from '@angular/core';

import {AlertController, NavController, LoadingController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { StatisticsPage } from '../statistics/statistics'

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
    // If app is launched for the first time, language is asked
    if(!this.settings.initialized){
      this.askLanguage();
    }else{
      // Reset if app is opened (no word yet)
      if(this.data.word == ""){
        this.reset();
      }else if(this.data.dictionary !== this.settings.settings.dictionary){
        // Dictionary has been changed, word needs to be reset
        this.data.dictionary = this.settings.settings.dictionary;
        this.reset();
      }
    }
  }

  // Asks user's language and shows story after that
  askLanguage() {
    let inputs = this.settings.languages.map((lang) =>  {
      return {
        type: 'radio',
        label: this.settings.lang[lang],
        value: lang,
        checked: lang == 'english'
      }
    });

    let alert = this.alertCtrl.create({
      title: 'Select language',
      inputs: inputs,
      buttons: [{
        text: 'Continue',
        handler: data => {
          this.settings.updateLanguage(data).then(()=> {
            this.settings.updateDictionary(data).then(() => {
              this.showStory();
              this.data.reset_game();
            })
          })
        }
      }],
      enableBackdropDismiss: false,
      cssClass: 'language_screen'
      })
    alert.present();
  }

  // Shows story of the game
  showStory(){
    let storyScreen = this.alertCtrl.create({
      title: this.settings.lang.story,
      message: this.settings.lang.story_content,
      buttons: [
        {
          text: this.settings.lang.continue,
          cssClass: 'game_over_button'
        }
      ],
      enableBackdropDismiss: false,
      cssClass: 'story_screen'
    });
    storyScreen.present();
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
      title: this.data.victory ? this.settings.lang.victory : this.settings.lang.game_over,
      message: this.data.victory ? this.settings.lang.victory_message + this.data.word + "." : 
                                   this.settings.lang.game_over_message + this.data.word + ".",
      buttons: [
        {
          text: this.settings.lang.play_again,
          handler: () => {
            this.reset();
          }
        }
      ],
      enableBackdropDismiss: false,
      cssClass: 'game_over_screen'
    });
    if(this.data.victory){
      this.data.add_victory();
    }else{
      this.data.add_loss();
    }
    gameOverScreen.present();
  }

  nextPage(){
    this.navCtrl.setRoot(StatisticsPage);
  }

  prevPage(){
    this.navCtrl.setRoot(SettingsPage);
  }

}