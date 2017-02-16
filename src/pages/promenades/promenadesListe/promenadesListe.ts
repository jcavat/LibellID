import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {JsonDataService} from '../../../providers/jsonDataService';



@Component({
  templateUrl: 'promenadesListe.html'
})
export class PromenadesListePage {
    private promenadesData: any;

  constructor(public navCtrl: NavController,public jsonDataService: JsonDataService) {
      this.loadData();
  }

  private loadData():void{
      let that = this;
       this.jsonDataService.getPromenades().then(function(val){
           that.promenadesData = val;
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
  /*private openPage(libell):void{
      this.navCtrl.push(PromenadeDetail, {libellule: libell});
  }*/

}
