import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';
declare var cordova: any;
declare var ga,ol: any;

@Component({
  templateUrl: 'promenadesCarte.html'
})
export class PromenadesCartePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    var layer = ga.layer.create('ch.astra.ivs-nat');
    var map = new ga.Map({
      target: 'map',
      layers: [layer],
      view: new ol.View({
        resolution: 100,
        center: [500106.8,118142.5]
      })
    });
  }

}
