import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {JsonDataService} from '../../providers/jsonDataService';
import {FicheLibellulePage} from '../ficheLibellule/ficheLibellule';

@Component({
  templateUrl: 'fichesInfo.html'
})
export class FichesInfoPage {
  private dragonfliesData: any;

  constructor(public navCtrl: NavController, public jsonDataService: JsonDataService) {
      this.loadData();
  }
  private loadData():void{
      let that = this;
       this.jsonDataService.getDragonflies().then(function(val){
           that.dragonfliesData = val;
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
  private openPage(d):void{
      this.navCtrl.push(FicheLibellulePage, {dragonfly: d});
  }

}
