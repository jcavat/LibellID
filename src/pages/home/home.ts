import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AutrePage } from '../autres/autres';
import { IdentifierPage } from '../identifier/identifier';
import {PromenadesCartePage} from '../promenades/promenadesCarte/promenadesCarte';
import {PromenadesListePage} from '../promenades/promenadesListe/promenadesListe';
import { GlobalService } from '../../app/globalService'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    autrePage = AutrePage;
    identifierPage = IdentifierPage;

  constructor(public navCtrl: NavController, public globalService: GlobalService) {

  }

  private afficherPromenade(){
    if(this.globalService.affiCarte){
      this.navCtrl.push(PromenadesCartePage);
    }else{
      this.navCtrl.push(PromenadesListePage);
    }
  }
}
