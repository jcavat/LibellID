import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AutrePage } from '../autres/autres';
import { IdentifierPage } from '../identifier/identifier';
import {PromenadesPage} from '../promenades/promenades';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    autrePage = AutrePage;
    identifierPage = IdentifierPage;
    promenadesPage = PromenadesPage;



  constructor(public navCtrl: NavController) {

  }
}
