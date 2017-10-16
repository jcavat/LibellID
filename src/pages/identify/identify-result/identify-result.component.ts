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
  private dragonfliesDataSorted = [];
  private criteriaSelected:number = 0;
  private useDate: boolean;
  private usePosition: boolean;

  constructor(private navCtrl: NavController, navParams: NavParams, private jsonDataService: JsonDataService) {
      this.criteria = navParams.get("criteria");
      this.useDate = navParams.get("useDate");
      this.usePosition = navParams.get("usePosition");
      this.loadData();
  }
  private loadData():void{
      let that = this;
      let numberOfCriteriaPerDragonfly:number[]
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
             that.dragonfliesDataSorted[i] = [that.dragonfliesData[i], that.trueCount(that.matchedCriteria[i])];
           }
           that.dragonfliesDataSorted.sort(function(a,b){
             if (b[1]-a[1] != 0){
                return b[1]-a[1];

            }else{
                return a[0].commonName-b[0].commonName;
            }
           });
           for(var i = 0; i<that.criteria.length;i++){
               if(that.criteria[i].length != 0){
                   that.criteriaSelected++;
               }
           }
       }).catch(function(err:Error){
           alert("Un problème est survenu\n"+err.name+"\n"+err.message)
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

  private openPage(d:Dragonfly, c):void{
    this.navCtrl.push(DragonflyPage, {dragonfly: d, criteria: c});
  }
}
