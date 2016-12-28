import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HangmanPage } from '../../pages/hangman/hangman'
import { SettingsPage } from '../../pages/settings/settings';
import { StatisticsPage } from '../../pages/statistics/statistics';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavBarComponent implements OnInit {
  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  changePage(page){
    if(page == 'Hangman'){
      this.navCtrl.setRoot(HangmanPage);
    }else if(page == 'Settings'){
      this.navCtrl.setRoot(SettingsPage);
    }else if(page == 'Statistics'){
      this.navCtrl.setRoot(StatisticsPage);
    }
  }
}