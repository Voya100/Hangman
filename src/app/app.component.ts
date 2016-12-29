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

  rootPage: any = HangmanPage;

  constructor(platform: Platform, gameData: GameDataService, settings: SettingsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      
      settings.init().then(() => {
        gameData.init();
        Splashscreen.hide();
      })

    });
  }

}
