
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'ficheLibelluleOngletPhotos.html'
})
export class FicheLibelluleOngletPhotosPage {
  private dragonfly: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.dragonfly = navParams.data;
  }


}
