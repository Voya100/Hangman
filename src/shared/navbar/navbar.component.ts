import { Component, OnInit } from '@angular/core';
import { App, NavController, Platform } from 'ionic-angular';

import { HangmanPage } from '../../pages/hangman/hangman'
import { SettingsPage } from '../../pages/settings/settings';
import { StatisticsPage } from '../../pages/statistics/statistics';

import { SettingsService } from '../../services/settings.service'

// NavBarComponent is the top component that handles page navigation

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavBarComponent implements OnInit {
  constructor(private app: App,
              public navCtrl: NavController,
              private platform: Platform,
              private settings: SettingsService) { }

  ngOnInit() { 
    // Adds back button functionality to Android. All pages bring back to home page.
    // Note: This most likely isn't the best place to implement this functionality, because it is reset every time a page is switched.
    // app.component.ts would likely be the best place, but it can't access NavControl, which is needed for this.
    // If you know a better place to place this (in this kind of app structure), feel free to tell me. :)
    this.platform.registerBackButtonAction(() => {
      const portal = this.app._appRoot._getPortal();
      if(!(this.navCtrl.getActive().instance instanceof HangmanPage)){
        // If there is an overlay view (setting select, etc.), and it isn't language initialisation, pop them
        if(portal.length() > 0 && this.settings.initialized){
            portal.pop();
        }else{
          // Move to main
          this.navCtrl.setRoot(HangmanPage);
        }
      }else{
        this.platform.exitApp();
      }
    });
  }
  
  // Navigates to page
  changePage(page){
    if(page == 'Hangman'){
      this.navCtrl.setRoot(HangmanPage);
    }else if(page == 'Settings'){
      this.navCtrl.setRoot(SettingsPage);
    }else if(page == 'Statistics'){
      this.navCtrl.setRoot(StatisticsPage);
    }
  }

  // Returns name of current page
  currentPage(){
    let page = this.navCtrl.getActive().instance;
    if(page instanceof HangmanPage){
      return 'Hangman';
    }else if(page instanceof SettingsPage){
      return 'Settings';
    }else if(page instanceof StatisticsPage){
      return 'Statistics';
    }else{
      return null;
    }
  }
}