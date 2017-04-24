
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {JsonDataService} from '../../../../providers/data-json.service';
import {Dragonfly} from '../../../../app/classes/dragonfly/dragonfly';

@Component({
  templateUrl: 'dragonfly-home-tab.component.html'
})
export class DragonflyHomeTabPage {
  private dragonfly: Dragonfly;
  private criteria: Object[];
  private selectedCriteria: number[][];
  constructor(private navCtrl: NavController, private navParams: NavParams, private jsonDataService: JsonDataService) {
      this.dragonfly  = navParams.data.dragonfly;
      this.selectedCriteria = navParams.data.criteria;
      this.loadData();
  }
  private loadData():void{
      let that = this;
       this.jsonDataService.criteria().then(function(val){
           that.criteria = val;
       }).catch(function(err){
           alert("Un problème est survenu")
       });
  }
  
  ionViewDidEnter(){

  }
}
