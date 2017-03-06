
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'dragonfly-pictures-tab.component.html'
})
export class DragonflyPicturesTabPage {
  private dragonfly: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
