
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {FicheLibelluleOngletAccueilPage} from './ficheLibelluleOnglets/ficheLibelluleOngletAccueil/ficheLibelluleOngletAccueil';
import {FicheLibelluleOngletPhotosPage} from './ficheLibelluleOnglets/ficheLibelluleOngletPhotos/ficheLibelluleOngletPhotos';
import {FicheLibelluleOngletInfosPage} from './ficheLibelluleOnglets/ficheLibelluleOngletInfos/ficheLibelluleOngletInfos';
import {FicheLibelluleOngletDistributionPage} from './ficheLibelluleOnglets/ficheLibelluleOngletDistribution/ficheLibelluleOngletDistribution';

@Component({
  templateUrl: 'ficheLibellule.html'
})
export class FicheLibellulePage {
  private dragonfly: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.dragonfly = navParams.get('dragonfly');
  }
  ficheLibelluleOngletAccueilPage = FicheLibelluleOngletAccueilPage;
  ficheLibelluleOngletPhotosPage = FicheLibelluleOngletPhotosPage;
  ficheLibelluleOngletInfosPage = FicheLibelluleOngletInfosPage;
  ficheLibelluleOngletDistributionPage = FicheLibelluleOngletDistributionPage;



}
