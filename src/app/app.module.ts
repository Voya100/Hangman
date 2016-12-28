import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HangmanPage } from '../pages/hangman/hangman'
import { SettingsPage } from '../pages/settings/settings';
import { StatisticsPage } from '../pages/statistics/statistics';

import { NavBarComponent } from '../shared/navbar/navbar.component'

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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SettingsService, WordRandomizerService]
})
export class AppModule {}
