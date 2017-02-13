
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {FicheLibelluleOngletAccueilPage} from './ficheLibelluleOnglets/ficheLibelluleOngletAccueil/ficheLibelluleOngletAccueil';

@Component({
  templateUrl: 'ficheLibellule.html'
})
export class FicheLibellulePage {
  private libellule: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.libellule = navParams.get('libellule');
  }
  ficheLibelluleOngletAccueilPage = FicheLibelluleOngletAccueilPage;


}
