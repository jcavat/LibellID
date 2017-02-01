import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var cordova;
import {JsonService} from '../../providers/json-service';
import {FicheLibellulePage} from '../ficheLibellule/ficheLibellule';

@Component({
  templateUrl: 'fichesInfo.html',
  providers:[JsonService]
})
export class FichesInfoPage {
  public json: any;

  constructor(public navCtrl: NavController, public jsonService: JsonService, public http: Http) {
      this.loadJson();
  }
  loadJson(){
      this.http.get('./json/libellID.json')
         .map(res => res.json())
         .subscribe(data => {
             this.json = data.libellules;
       });
  }
  openPage(libell){
      this.navCtrl.push(FicheLibellulePage, {libellule: libell});
  }

}
