import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';
declare var cordova: any;
declare var ga,ol: any;

@Component({
  templateUrl: 'walks-map.component.html'
})
export class WalksMapPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    var layer = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
    var map = new ga.Map({
      target: 'map',
      view: new ol.View({
        resolution: 200,
        center: [500106.8,118142.5]
      })
    });
    map.addLayer(layer);
  }

}
