
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Dragonfly} from '../../app/classes/dragonfly/dragonfly.class';


import {DragonflyHomeTabPage} from './dragonfly-tabs/dragonfly-home-tab/dragonfly-home-tab.component';
import {DragonflyPicturesTabPage} from './dragonfly-tabs/dragonfly-pictures-tab/dragonfly-pictures-tab.component';
import {DragonflyInfoTabPage} from './dragonfly-tabs/dragonfly-info-tab/dragonfly-info-tab.component';
import {DragonflyDistributionTabPage} from './dragonfly-tabs/dragonfly-distribution-tab/dragonfly-distribution-tab.component';

@Component({
  templateUrl: 'dragonfly.component.html'
})
export class DragonflyPage {
  private dragonfly: Dragonfly;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.dragonfly = navParams.get('dragonfly');
  }
  private dragonflyHomeTabPage = DragonflyHomeTabPage;
  private dragonflyPicturesTabPage = DragonflyPicturesTabPage;
  private dragonflyInfoTabPage = DragonflyInfoTabPage;
  private dragonflyDistributionTabPage = DragonflyDistributionTabPage;



}
