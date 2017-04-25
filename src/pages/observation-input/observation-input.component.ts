import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Dragonfly} from '../../app/classes/dragonfly/dragonfly';


@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.dragonfly = navParams.get("dragonfly");
  }
  ionViewWillEnter(){
    if(this.dragonfly){
      console.log(this.dragonfly.commonName);
    }
  }

}
