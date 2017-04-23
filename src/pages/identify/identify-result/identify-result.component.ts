import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {JsonDataService} from '../../../providers/data-json.service';
import {DragonflyPage} from '../../dragonfly/dragonfly.component';
import {Dragonfly} from '../../../app/classes/dragonfly/dragonfly';


@Component({
  templateUrl: 'identify-result.component.html'
})
export class IdentifyResultPage {
  private dragonfliesData: Dragonfly[];
  private criteria: number[][];
  private matchedCriteria: boolean[][] = [];

  constructor(private navCtrl: NavController, navParams: NavParams, private jsonDataService: JsonDataService) {
      this.criteria = navParams.get("criteria");
      this.loadData();
  }
  private loadData():void{
      let that = this;
      this.jsonDataService.dragonflies().then(function(val){
           that.dragonfliesData = val as Dragonfly[];
           for(var i = 0; i < that.dragonfliesData.length; i++){
             let dragonflyMatchedCriteria: boolean[] = []
             for(var j = 0; j < that.criteria.length; j++){
               dragonflyMatchedCriteria[j] = that.dragonfliesData[i].criteria[j].some(function(v){
                 return that.criteria[j].indexOf(v) >= 0;
               });
             }
             that.matchedCriteria[i] = dragonflyMatchedCriteria;
           }
       }).catch(function(err){
           alert("Un problème est survenu")
      });
  }

  private trueCount(arr:boolean[]):number{
    let numberOfTrue:number = 0;
    arr.forEach(function(value){
      if (value){
        numberOfTrue++;
      }
    })
    return numberOfTrue
  }

  private openPage(d, c):void{
      this.navCtrl.push(DragonflyPage, {dragonfly: d, criteria: c});
  }

  ionViewDidEnter(){

  }

}
