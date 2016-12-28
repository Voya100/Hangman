import { Component, OnInit } from '@angular/core';

import { NavBarComponent } from '../../shared/navbar/navbar.component'

import { SettingsService } from '../../services/settings.service'

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  constructor(private settings: SettingsService) { }

  ngOnInit() { }
}