
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Dragonfly} from '../../../../app/classes/dragonfly/dragonfly';

@Component({
  templateUrl: 'dragonfly-distribution-tab.component.html'
})
export class DragonflyDistributionTabPage {
  private dragonfly: Dragonfly;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
