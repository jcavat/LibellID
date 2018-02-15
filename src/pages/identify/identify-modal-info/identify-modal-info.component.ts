import { Component, Renderer } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'identify-modal-info.component.html'
})

export class IdentifyModalInfo{
    private title:string="";
    private text:string="";
    constructor(private viewCtrl: ViewController, private renderer: Renderer, private navParams:NavParams){
        
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-info', true);
        this.title = navParams.get('title');
        this.text = navParams.get('text');
        
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
}
