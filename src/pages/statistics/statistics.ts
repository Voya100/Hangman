import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { HangmanPage } from '../hangman/hangman';
import { SettingsPage } from '../settings/settings'

import { GameDataService } from '../../services/game-data.service'
import { SettingsService } from '../../services/settings.service'

// StatisticsPage contains statistical info and gives option to reset them.

@Component({
  templateUrl: 'statistics.html'
})
export class StatisticsPage{
  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private data: GameDataService,
              private settings: SettingsService) { }
  
  victory_percent(){
    return Math.round(this.data.victories() / (this.data.victories() + this.data.losses()) * 100);
  }

  loss_percent(){
    return Math.round(this.data.losses() / (this.data.victories() + this.data.losses()) * 100);
  }

  // Gives confirmation prompt and resets statistics, if user so wishes
  reset(){
    let confirm = this.alertCtrl.create({
      title: this.settings.lang.delete_statistics,
      message: this.settings.lang.delete_message,
      buttons: [
        {
          text: this.settings.lang.cancel
        },
        {
          text: this.settings.lang.reset,
          handler: () => {this.data.reset_statistics();}
        }
      ]
    });
    confirm.present();
  }

  nextPage(){
    this.navCtrl.setRoot(SettingsPage);
  }

  prevPage(){
    this.navCtrl.setRoot(HangmanPage);
  }

}