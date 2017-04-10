import { Component, Renderer } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'modal-info-point.component.html'
})

export class ModalInfoPoint{
    private point: String[];
    constructor(private navParams: NavParams, private viewCtrl: ViewController, private renderer: Renderer){
        this.point = navParams.get('point');
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-info', true);
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
}
