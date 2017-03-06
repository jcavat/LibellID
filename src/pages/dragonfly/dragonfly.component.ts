
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {DragonflyHomeTabPage} from './dragonflyTabs/dragonfly-home-tab/dragonfly-home-tab.component';
import {DragonflyPicturesTabPage} from './dragonflyTabs/dragonfly-pictures-tab/dragonfly-pictures-tab.component';
import {DragonflyInfoTabPage} from './dragonflyTabs/dragonfly-info-tab/dragonfly-info-tab.component';
import {DragonflyDistributionTabPage} from './dragonflyTabs/dragonfly-distribution-tab/dragonfly-distribution-tab.component';

@Component({
  templateUrl: 'dragonfly.component.html'
})
export class DragonflyPage {
  private dragonfly: any;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.dragonfly = navParams.get('dragonfly');
  }
  private dragonflyHomeTabPage = DragonflyHomeTabPage;
  private dragonflyPicturesTabPage = DragonflyPicturesTabPage;
  private dragonflyInfoTabPage = DragonflyInfoTabPage;
  private dragonflyDistributionTabPage = DragonflyDistributionTabPage;



}
