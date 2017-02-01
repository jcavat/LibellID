import { Component } from '@angular/core';

import { NavController, NavParams,ToastController, PopoverController } from 'ionic-angular';
/*import { File, HTTP } from 'ionic-native';*/
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

    /*HTTP.get('./json/libellID.json',{},{}).then(
        data => {
            console.log(data.status);
            console.log(data.data);
            console.log("Trouvé !");
        }
    ).catch(
        error => {
            console.log(error.status);
            console.log(error.data);
            console.log("Perdu !");
        }
    );
    console.log("Test");*/

    /*let toast = this.toastCtrl.create({
      message: cordova.file.dataDirectory,
      duration: 30000
    });
    toast.present();*/
  }

}
