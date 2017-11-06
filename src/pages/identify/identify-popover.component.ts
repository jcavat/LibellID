import { Component } from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

@Component({
  template: `
    <ion-list>
        <ion-item>
          <ion-label>Filtrer par date</ion-label>
          <ion-checkbox (click)="this.dismiss()" [(ngModel)]="this.useDate"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Filtrer par altitude</ion-label>
          <ion-checkbox (click)="this.dismiss()" [(ngModel)]="this.usePosition"></ion-checkbox>
        </ion-item>
    </ion-list>
  `
})
export class IdentifyPopover {
  private useDate: boolean;
  private usePosition: boolean;
  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
      this.useDate = navParams.get('useDate');
      this.usePosition = navParams.get('usePosition');
  }

  dismiss() {
    console.log(this.useDate);
    console.log(this.usePosition);
    this.viewCtrl.dismiss({
        useDate: this.useDate,
        usePosition: this.usePosition
    });
  }
}
