import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {WalkInProgressPage} from '../walk-in-progress/walk-in-progress.component';
import {Walk} from '../../../app/classes/walk/walk';

@Component({
  templateUrl: 'walk-detail.component.html'
})
export class WalkDetailPage {
    private walk: Walk;
    private months:String[] = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  constructor(private navCtrl: NavController,private navParams: NavParams) {
      this.walk = navParams.get('walk');
  }

  private openPage(): void{
    this.navCtrl.push(WalkInProgressPage, {walk: this.walk});
  }
}
