import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HangmanPage } from '../pages/hangman/hangman'

import { GameDataService } from '../services/game-data.service'
import { SettingsService } from '../services/settings.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, gameData: GameDataService, settings: SettingsService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      // Get settings files and apply them before launch
      settings.init().then(() => {
        this.rootPage = HangmanPage;
        gameData.init();
        Splashscreen.hide();
      })

    });
  }

}
