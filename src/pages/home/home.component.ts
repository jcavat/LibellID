import { Component } from '@angular/core';

import { NavController, ModalController, Platform } from 'ionic-angular';

import { OtherPage } from '../other/other.component';
import { IdentifyPage } from '../identify/identify.component';
import {WalksPage} from '../walks/walks.component';
import { Storage } from '@ionic/storage';

import { HomeModalInfo } from './home-modal-info/home-modal-info.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

    private otherPage = OtherPage;
    private identifyPage = IdentifyPage;
    private promenadesPage = WalksPage;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private platform: Platform,
              private modalCtrl: ModalController) {
      

    this.storage.get('firstTimePopUpHome').then((val) => {
      if (val == null || val == undefined || val == true) {
          this.displayModalInfo();
          this.storage.set('firstTimePopUpHome', false);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

    });
    
    
  }

  private displayModalInfo(): void {
    let modal = this.modalCtrl.create(HomeModalInfo);
    modal.present();
  }

}
