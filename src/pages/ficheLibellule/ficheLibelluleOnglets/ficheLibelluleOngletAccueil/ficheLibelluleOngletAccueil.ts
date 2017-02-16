
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {JsonDataService} from '../../../../providers/jsonDataService';



@Component({
  templateUrl: 'ficheLibelluleOngletAccueil.html'
})
export class FicheLibelluleOngletAccueilPage {
  private libellule: any;
  private criteres: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonDataService: JsonDataService) {
      this.libellule = navParams.data;
      this.loadData();
  }
  private loadData():void{
      let that = this;
       this.jsonDataService.getCriteres().then(function(val){
           that.criteres = val;
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
}
