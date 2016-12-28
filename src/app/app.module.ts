import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage' 

import { MyApp } from './app.component';
import { HangmanPage } from '../pages/hangman/hangman'
import { SettingsPage } from '../pages/settings/settings';
import { StatisticsPage } from '../pages/statistics/statistics';

import { NavBarComponent } from '../shared/navbar/navbar.component'

import { GameDataService } from '../services/game-data.service'
import { SettingsService } from '../services/settings.service'
import { WordRandomizerService} from '../services/word-randomizer.service'

@NgModule({
  declarations: [
    MyApp,
    HangmanPage,
    SettingsPage,
    StatisticsPage,
    NavBarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HangmanPage,
    SettingsPage,
    StatisticsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage, 
    GameDataService, 
    SettingsService, 
    WordRandomizerService
  ]
})
export class AppModule {}
