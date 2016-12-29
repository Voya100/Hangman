import { Component } from '@angular/core';

import { SettingsService } from '../../services/settings.service'

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage  {

  difficulties = ['easy', 'medium', 'hard'];

  constructor(private settings: SettingsService) { }

  updateLanguage(value){
    this.settings.updateLanguage(value);
  }
}