import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { GameDataService } from '../../services/game-data.service'
import { SettingsService } from '../../services/settings.service'

@Component({
  templateUrl: 'statistics.html'
})
export class StatisticsPage implements OnInit {
  constructor(private alertCtrl: AlertController,
              private data: GameDataService,
              private settings: SettingsService) { }

  ngOnInit() { }

  
  victory_percent(){
    return this.data.victories ? Math.round(this.data.victories / (this.data.victories + this.data.losses) * 100) : '-';
  }

  loss_percent(){
    return this.data.losses ? Math.round(this.data.losses / (this.data.victories + this.data.losses) * 100) : "-";
  }

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
          handler: () => {
            this.data.reset_statistics();
          }
        }
      ]
    });
    confirm.present();
  }

}