import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {JsonDataService} from '../../providers/jsonDataService';
import {DragonflyPage} from '../dragonfly/dragonfly.component';

@Component({
  templateUrl: 'info-sheet.component.html'
})
export class InfoSheetPage {
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
      this.navCtrl.push(DragonflyPage, {dragonfly: d});
  }

}
