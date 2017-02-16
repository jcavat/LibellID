import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {JsonDataService} from '../../providers/jsonDataService';
import {FicheLibellulePage} from '../ficheLibellule/ficheLibellule';

@Component({
  templateUrl: 'fichesInfo.html'
})
export class FichesInfoPage {
  private libellulesData: any;

  constructor(public navCtrl: NavController, public jsonDataService: JsonDataService) {
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
