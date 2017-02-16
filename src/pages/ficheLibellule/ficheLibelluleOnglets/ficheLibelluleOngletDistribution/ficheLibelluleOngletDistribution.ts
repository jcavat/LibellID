
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'ficheLibelluleOngletDistribution.html'
})
export class FicheLibelluleOngletDistributionPage {
  private libellule: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.libellule = navParams.data;
  }


}
