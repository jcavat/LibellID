import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'promenadeDetail.html'
})
export class PromenadeDetailPage {
    private walk: any;
    private months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  constructor(public navCtrl: NavController,public navParams: NavParams) {
      this.walk = navParams.get('walk');
  }
}
