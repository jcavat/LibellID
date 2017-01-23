import { Component } from '@angular/core';

import { NavController, NavParams,ToastController, PopoverController } from 'ionic-angular';
import { File } from 'ionic-native';
import { PopoverPromenades } from '../popoverPromenades';
declare var cordova: any;
declare var ga,ol: any;

@Component({
  templateUrl: 'promenadesCarte.html'
})
export class PromenadesCartePage {

  constructor(public navCtrl: NavController,public toastCtrl : ToastController, public popoverCtrl: PopoverController) {

  }

  presentPopover(myEvent){
      let popover = this.popoverCtrl.create(PopoverPromenades);
      popover.present({
          ev: myEvent
      });
  }

  ionViewDidLoad(){
    var layer = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
    var map = new ga.Map({
      target: 'map',
      layers: [layer],
      view: new ol.View({
        resolution: 100,
        center: [500106.8,118142.5]
      })
    });
    let toast = this.toastCtrl.create({
      message: cordova.file.dataDirectory,
      duration: 30000
    });
    toast.present();
  }

}
