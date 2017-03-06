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

    private otherPage = OtherPage;
    private identifyPage = IdentifyPage;
    private promenadesPage = WalksPage;

  constructor(private navCtrl: NavController) {

  }

}
