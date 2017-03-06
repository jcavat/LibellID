import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {JsonDataService} from '../../../providers/jsonDataService';
import {WalkDetailPage} from '../walk-detail/walk-detail.component';

@Component({
  templateUrl: 'walks-list.component.html'
})
export class WalksListPage {
    private walksData: any;

  constructor(public navCtrl: NavController,public jsonDataService: JsonDataService) {
      this.loadData();
  }

  private loadData():void{
      let that = this;
       this.jsonDataService.getWalks().then(function(val){
           that.walksData = val;
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
  private openPage(w):void{
      this.navCtrl.push(WalkDetailPage, {walk: w});
  }

}
