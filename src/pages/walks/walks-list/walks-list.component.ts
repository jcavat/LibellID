import { Component } from '@angular/core';

import {Walk} from '../../../app/classes/walk/walk';
import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import {JsonDataService} from '../../../providers/data-json.service';
import {WalkDetailPage} from '../walk-detail/walk-detail.component';
import {HomePage} from '../../home/home.component';
import {ModalAddWalk} from './modal-add-walk/modal-add-walk.component';

@Component({
    selector: 'page-walk-list', 
    templateUrl: 'walks-list.component.html'
})
export class WalksListPage {
    private walksData: Walk[];

  constructor(private navCtrl: NavController,private jsonDataService: JsonDataService, private appCtrl: App, private modalCtrl: ModalController) {
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
  private openModal():void{
      let modal = this.modalCtrl.create(ModalAddWalk);
      modal.present();
  }

  private getNumber(num) {
      return new Array(num);
  }

}
