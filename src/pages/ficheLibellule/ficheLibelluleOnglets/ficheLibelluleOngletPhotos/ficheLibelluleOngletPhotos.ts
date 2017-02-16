
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'ficheLibelluleOngletPhotos.html'
})
export class FicheLibelluleOngletPhotosPage {
  private libellule: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.libellule = navParams.data;
  }


}
