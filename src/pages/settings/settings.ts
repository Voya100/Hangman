import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'

import { HangmanPage } from '../hangman/hangman';
import { StatisticsPage } from '../statistics/statistics'

import { SettingsService } from '../../services/settings.service'

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage  {

  difficulties = ['easy', 'medium', 'hard'];

  constructor(private navCtrl: NavController, private settings: SettingsService) { }

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