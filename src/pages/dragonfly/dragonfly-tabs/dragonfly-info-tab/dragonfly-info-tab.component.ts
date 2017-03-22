
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Dragonfly} from '../../../../app/classes/dragonfly/dragonfly';




@Component({
  templateUrl: 'dragonfly-info-tab.component.html'
})
export class DragonflyInfoTabPage {
  private dragonfly: Dragonfly;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
