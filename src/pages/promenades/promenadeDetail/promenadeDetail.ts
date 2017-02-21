import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'promenadeDetail.html'
})
export class PromenadeDetailPage {
    private promenade: any;
    private mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  constructor(public navCtrl: NavController,public navParams: NavParams) {
      this.promenade = navParams.get('promenade');
  }
}
