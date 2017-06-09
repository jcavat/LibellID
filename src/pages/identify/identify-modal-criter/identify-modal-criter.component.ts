import { Component, Renderer } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'identify-modal-criter.component.html'
})

export class IdentifyModalCriter{
    private value:Object;
    constructor(private viewCtrl: ViewController, private navParams: NavParams, private renderer: Renderer){
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-criter', true);
        this.value = navParams.get('value');
    }
    ionViewDidEnter(){
        setTimeout(()=>{this.dismiss()},2000);
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
}
