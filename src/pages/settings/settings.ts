import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular'

import { HangmanPage } from '../hangman/hangman';
import { StatisticsPage } from '../statistics/statistics'

import { SettingsService } from '../../services/settings.service'

// Settings page contains all setting options. All changes are saved to memory.

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage  {

  difficulties = ['easy', 'medium', 'hard'];

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private settings: SettingsService) { }

  openInfo(){
    let infoScreen = this.alertCtrl.create({
      message: this.settings.lang.setting_info,
      buttons: [
        {
          text: this.settings.lang.close
        }
      ],
      enableBackdropDismiss: false,
      cssClass: 'info_screen'
    });
    infoScreen.present();
  }

  updateLanguage(value){
    this.settings.updateLanguage(value);
  }

  updateDictionary(value){
    this.settings.updateDictionary(value);
  }

  updateOnlineMode(e){
    this.settings.updateOnlineMode(e._checked);
  }

  nextPage(){
    this.navCtrl.setRoot(HangmanPage);
  }

  prevPage(){
    this.navCtrl.setRoot(StatisticsPage);
  }
}