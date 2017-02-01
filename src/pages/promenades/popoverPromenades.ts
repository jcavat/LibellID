import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { GlobalService } from '../../app/globalService';
import { HomePage } from '../home/home';
import {PromenadesCartePage} from './promenadesCarte/promenadesCarte';
import {PromenadesListePage} from './promenadesListe/promenadesListe';


@Component({
  template: `
    <ion-list>
      <ion-item>
        <ion-label>Carte</ion-label>
        <ion-toggle [(ngModel)]=this.globalService.affiCarte (click)="close()"></ion-toggle>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPromenades {
  constructor(public viewCtrl: ViewController, public globalService:GlobalService, public navCtrl: NavController) {}
  close() {
    /*this.navCtrl.setRoot(HomePage);*/
    if(this.globalService.affiCarte){
      this.navCtrl.push(PromenadesCartePage);
    }else{
      this.navCtrl.push(PromenadesListePage);
    }
    this.viewCtrl.dismiss();
  }
}
