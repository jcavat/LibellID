import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {JsonDataService} from '../../providers/jsonDataService';
import {FicheLibellulePage} from '../ficheLibellule/ficheLibellule';

@Component({
  templateUrl: 'fichesInfo.html'
})
export class FichesInfoPage {
  private libellulesData: any;

  constructor(public navCtrl: NavController, public jsonDataService: JsonDataService, public http: Http) {
      this.loadData();
  }
  private loadData():void{
      let that = this;
       this.jsonDataService.getLibellules().then(function(val){
           that.libellulesData = val;
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  } 
  private openPage(libell):void{
      this.navCtrl.push(FicheLibellulePage, {libellule: libell});
  }

}
