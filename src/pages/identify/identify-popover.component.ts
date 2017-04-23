import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  template: `
    <ion-list>
        <ion-item>
          <ion-label>Filtrer par date</ion-label>
          <ion-checkbox (click)="this.close()"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Filtrer par lieu</ion-label>
          <ion-checkbox (click)="this.close()"></ion-checkbox>
        </ion-item>
    </ion-list>
  `
})
export class IdentifyPopover {
  constructor(private viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
