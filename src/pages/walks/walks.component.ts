
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {WalksMapPage} from './walks-map/walks-map.component';
import {WalksListPage} from './walks-list/walks-list.component';


@Component({
  templateUrl: 'walks.component.html'
})
export class WalksPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  walksListPage = WalksListPage;
  walksMapPage = WalksMapPage;


}
