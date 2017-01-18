import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {FichesInfoPage} from '../fichesInfo/fichesInfo';
import {SaisieObservationPage} from '../saisieObservation/saisieObservation';
import {AidePage} from '../aide/aide';

@Component({
  templateUrl: 'autres.html'
})
export class AutrePage {

    fichesInfoPage = FichesInfoPage;
    saisieObservationPage = SaisieObservationPage;
    aidePage = AidePage;

  constructor(public navCtrl: NavController) {

  }

}
