import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {WalkInProgressPage} from '../walk-in-progress/walk-in-progress.component';
import {Walk} from '../../../app/classes/walk/walk';

@Component({
  selector: 'page-walk-detail', 
  templateUrl: 'walk-detail.component.html'
})
export class WalkDetailPage {
    private walk: Walk;
    private access:Array<{hidden: boolean, imgSrc: string}>;
    private months:String[] = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  constructor(private navCtrl: NavController,private navParams: NavParams) {
      this.walk = navParams.get('walk');
      let i=0;
      this.access=[];
      for(let i=0; i<5;i++) {
        this.access.push({hidden:this.walk.accessibility.reduce((acc, current) => acc && current != i, true), imgSrc:"assets/img/acces"+(i+1)+".png"});
      }
  }

  private openPage(): void{
    this.navCtrl.push(WalkInProgressPage, {walk: this.walk});
  }

  private getNumber(num) {
    return new Array(num);
}
}
