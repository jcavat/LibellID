import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';
import {IdentifyPopover} from './identify-popover.component';


@Component({
  templateUrl: 'identify.component.html'
})
export class IdentifyPage {

    constructor(private navCtrl: NavController, private popoverCtrl: PopoverController) {

    }
    private presentPopover():void{
        let popover = this.popoverCtrl.create(IdentifyPopover);
        popover.present();
    }
}
