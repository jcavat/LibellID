
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Dragonfly} from '../../../../app/classes/dragonfly/dragonfly.class';

@Component({
  templateUrl: 'dragonfly-pictures-tab.component.html'
})
export class DragonflyPicturesTabPage {
  private dragonfly: Dragonfly;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
