import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {InfoSheetPage} from '../info-sheet/info-sheet.component';
import {ObservationInputPage} from '../observation-input/observation-input.component';
import {HelpPage} from '../help/help.component';

@Component({
  templateUrl: 'other.component.html'
})
export class OtherPage {

    private infoSheetPage = InfoSheetPage;
    private observationInputPage = ObservationInputPage;
    private helpPage = HelpPage;

  constructor(private navCtrl: NavController) {

  }

}
