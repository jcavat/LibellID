
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'dragonfly-info-tab.component.html'
})
export class DragonflyInfoTabPage {
  private dragonfly: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
