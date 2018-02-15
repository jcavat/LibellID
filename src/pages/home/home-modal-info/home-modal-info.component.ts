import { Component, Renderer } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'home-modal-info.component.html'
})

export class HomeModalInfo{
    private title:string="";
    private text:string="";
    constructor(private viewCtrl: ViewController, private renderer: Renderer, private navParams:NavParams){
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-info', true);
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
}
