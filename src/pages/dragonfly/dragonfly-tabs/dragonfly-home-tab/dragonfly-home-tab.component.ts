
import { Component } from '@angular/core';

import { NavController, NavParams, App } from 'ionic-angular';
import {JsonDataService} from '../../../../providers/data-json.service';
import {Dragonfly} from '../../../../app/classes/dragonfly/dragonfly';
import {ObservationInputPage} from '../../../observation-input/observation-input.component';

@Component({
  templateUrl: 'dragonfly-home-tab.component.html'
})
export class DragonflyHomeTabPage {
  private dragonfly: Dragonfly;
  private criteria: Object[];
  private selectedCriteria: number[][];
  constructor(private navCtrl: NavController, private navParams: NavParams, private jsonDataService: JsonDataService, private appCtrl:App) {
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

  private getStyle(i:number):Object{
    if(this.selectedCriteria == null){
      return {};
    }else{
      if(this.selectedCriteria[i].length == 0){
        return {};
      }else{
        let that = this;
        if(this.dragonfly.criteria[i].some(function(v){
          return that.selectedCriteria[i].indexOf(v) >= 0;
        })){
          return {"background-color":"rgb(216, 254, 200)"};
        }else{
          return {"background-color":"rgb(254, 212, 200)"};
        }
      }
    }
  }

  private observationTransmit():void{
    this.appCtrl.getRootNav().push(ObservationInputPage, {dragonfly:this.dragonfly});
  }

  ionViewDidEnter(){

  }
}
