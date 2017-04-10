import { Component } from '@angular/core';

import {Walk} from '../../../app/classes/walk/walk';
import { NavController, NavParams, App } from 'ionic-angular';
import {JsonDataService} from '../../../providers/data-json.service';
import {WalkDetailPage} from '../walk-detail/walk-detail.component';
import {HomePage} from '../../home/home.component';

@Component({
  templateUrl: 'walks-list.component.html'
})
export class WalksListPage {
    private walksData: Walk[];

  constructor(private navCtrl: NavController,private jsonDataService: JsonDataService, private appCtrl: App) {
      this.loadData();
  }

  private loadData():void{
      let that = this;
       this.jsonDataService.walks().then(function(val){
           that.walksData = val as Walk[];
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
  private openPage(w):void{
      this.appCtrl.getRootNav().push(WalkDetailPage, {walk: w});
  }

}
