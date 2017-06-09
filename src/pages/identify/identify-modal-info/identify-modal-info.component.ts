import { Component, Renderer } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'identify-modal-info.component.html'
})

export class IdentifyModalInfo{
    constructor(private viewCtrl: ViewController, private renderer: Renderer){
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-info', true);
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
}
