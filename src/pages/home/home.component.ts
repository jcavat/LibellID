import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { OtherPage } from '../other/other.component';
import { IdentifyPage } from '../identify/identify.component';
import {WalksPage} from '../walks/walks.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

    otherPage = OtherPage;
    identifyPage = IdentifyPage;
    promenadesPage = WalksPage;

  constructor(public navCtrl: NavController) {

  }

}
