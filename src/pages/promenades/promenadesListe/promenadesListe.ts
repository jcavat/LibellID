import { Component } from '@angular/core';

import { NavController, NavParams,ToastController, PopoverController } from 'ionic-angular';
import { File } from 'ionic-native';
import { PopoverPromenades } from '../popoverPromenades';

@Component({
  templateUrl: 'promenadesListe.html'
})
export class PromenadesListePage {

  constructor(public navCtrl: NavController,public toastCtrl : ToastController, public popoverCtrl: PopoverController) {

  }

  presentPopover(myEvent){
      let popover = this.popoverCtrl.create(PopoverPromenades);
      popover.present({
          ev: myEvent
      });
  }

  ionViewDidLoad(){

  }

}
