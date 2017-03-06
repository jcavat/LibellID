import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {JsonDataService} from '../../providers/data-json.service';
import {DragonflyPage} from '../dragonfly/dragonfly.component';
import {Dragonfly} from '../../app/classes/dragonfly/dragonfly.class';


@Component({
  templateUrl: 'info-sheet.component.html'
})
export class InfoSheetPage {
  private dragonfliesData: Dragonfly[];

  constructor(private navCtrl: NavController, private jsonDataService: JsonDataService) {
      this.loadData();
  }
  private loadData():void{
      let that = this;
       this.jsonDataService.dragonflies().then(function(val){
           that.dragonfliesData = val as Dragonfly[];
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
  private openPage(d):void{
      this.navCtrl.push(DragonflyPage, {dragonfly: d});
  }

}
