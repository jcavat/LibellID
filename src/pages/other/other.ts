import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {InfoSheetPage} from '../infoSheet/infoSheet';
import {ObservationInputPage} from '../observationInput/observationInput';
import {HelpPage} from '../help/help';

@Component({
  templateUrl: 'other.component.html'
})
export class OtherPage {

    infoSheetPage = InfoSheetPage;
    observationInputPage = ObservationInputPage;
    helpPage = HelpPage;

  constructor(public navCtrl: NavController) {

  }

}
