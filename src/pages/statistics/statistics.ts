import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavBarComponent } from '../../shared/navbar/navbar.component'

import { GameDataService } from '../../services/game-data.service'

@Component({
  templateUrl: 'statistics.html'
})
export class StatisticsPage implements OnInit {
  constructor(private alertCtrl: AlertController,
              private data: GameDataService) { }

  ngOnInit() { }

  
  victory_percent(){
    return this.data.victories ? Math.round(this.data.victories / (this.data.victories + this.data.losses) * 100) : '-';
  }

  loss_percent(){
    return this.data.losses ? Math.round(this.data.losses / (this.data.victories + this.data.losses) * 100) : "-";
  }

  reset(){
    let confirm = this.alertCtrl.create({
      title: 'Delete statistics?',
      message: 'This action will reset statistics to 0 - there isn\'t a way to reverse it.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Reset',
          handler: () => {
            this.data.reset_statistics();
          }
        }
      ]
    });
    confirm.present();
  }

}