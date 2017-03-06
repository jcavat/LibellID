import { Component } from '@angular/core';

import {Walk} from '../../../app/classes/walk/walk.class';
import { NavController, NavParams } from 'ionic-angular';
import {JsonDataService} from '../../../providers/data-json.service';
import {WalkDetailPage} from '../walk-detail/walk-detail.component';
import {HomePage} from '../../home/home.component';

@Component({
  templateUrl: 'walks-list.component.html'
})
export class WalksListPage {
    private walksData: any;

  constructor(private navCtrl: NavController,private jsonDataService: JsonDataService) {
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
      this.navCtrl.push(WalkDetailPage, {walk: w});
  }

}
