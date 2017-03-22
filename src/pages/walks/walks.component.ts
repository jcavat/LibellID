
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {WalksMapPage} from './walks-map/walks-map.component';
import {WalksListPage} from './walks-list/walks-list.component';
import {HomePage} from '../home/home.component';


@Component({
  templateUrl: 'walks.component.html'
})
export class WalksPage {
  constructor(private navCtrl: NavController, private navParams: NavParams) {

  }
  private walksListPage = WalksListPage;
  private walksMapPage = WalksMapPage;


}
