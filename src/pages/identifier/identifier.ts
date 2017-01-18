import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController } from 'ionic-angular';

import {PopoverIdentifier} from './popoverIdentifier';

@Component({
  templateUrl: 'identifier.html'
})
export class IdentifierPage {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

  }

  presentPopover(myEvent){
      let popover = this.popoverCtrl.create(PopoverIdentifier);
      popover.present({
          ev: myEvent
      });
  }

}
