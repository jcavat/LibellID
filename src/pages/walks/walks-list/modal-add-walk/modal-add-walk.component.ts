import { Component, Renderer } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {FileChooser} from '@ionic-native/file-chooser';
import {JsonDataService} from '../../../../providers/data-json.service';

@Component({
  templateUrl: 'modal-add-walk.component.html',
  providers: [[FileChooser]]
})

export class ModalAddWalk{
    private point: String[];
    private walkName: string;
    private walkFile: string;
    private walkFilePath: string;
    constructor(private navParams: NavParams, private viewCtrl: ViewController, private renderer: Renderer, private fileChooser: FileChooser, private jsonDataService: JsonDataService){
        this.point = navParams.get('point');
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popup-info', true);
        this.walkFile = "";
        this.walkName = "";
    }

    private dismiss(): void{
        this.viewCtrl.dismiss();
    }
    private addWalk():void{
        if(this.walkName == "" || this.walkFile == ""){
            alert("Veuillez renseigner le nom et choisir un fichier");
        }else{
            alert(this.walkName+" - "+this.walkFile);
            this.jsonDataService.addWalk(this.walkName, this.walkFile);
            this.dismiss();
        }
    }
    private chooseFile():void{
        this.fileChooser.open()
          .then(uri => this.walkFile = uri)
          .catch(e => console.log(e));

    }
}
