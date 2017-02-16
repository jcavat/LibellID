
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {PromenadesCartePage} from './promenadesCarte/promenadesCarte';
import {PromenadesListePage} from './promenadesListe/promenadesListe';


@Component({
  templateUrl: 'promenades.html'
})
export class PromenadesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  promenadesListe = PromenadesListePage;
  promenadesCarte = PromenadesCartePage;


}
