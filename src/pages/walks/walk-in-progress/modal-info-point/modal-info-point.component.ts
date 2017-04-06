import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'modal-info-point.component.html'
})

export class ModalInfoPoint{
    private point: String[];
    constructor(private navParams: NavParams, private viewCtrl: ViewController){
        this.point = navParams.get('point');
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
}
