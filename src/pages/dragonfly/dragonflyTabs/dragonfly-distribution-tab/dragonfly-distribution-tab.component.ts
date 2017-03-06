
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'dragonfly-distribution-tab.component.html'
})
export class DragonflyDistributionTabPage {
  private dragonfly: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
