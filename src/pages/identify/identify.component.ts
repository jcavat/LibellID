import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';
import {IdentifyPopover} from './identify-popover.component';
import {JsonDataService} from '../../providers/data-json.service';



@Component({
  templateUrl: 'identify.component.html'
})
export class IdentifyPage {
    private criteria: Object[];
    constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, private jsonDataService: JsonDataService) {
      this.loadData();
    }
    private presentPopover():void{
        let popover = this.popoverCtrl.create(IdentifyPopover);
        popover.present();
    }
    private loadData():void{
        let that = this;
         this.jsonDataService.criteria().then(function(val){
             that.criteria = val;
         }).catch(function(err){
             alert("Un problème est survenu")
          });
    }
    ionViewDidEnter(){
      let tdValues = document.getElementsByClassName("criter-value");
      for(var i = 0; i < tdValues.length; i++){
        tdValues[i].addEventListener("click", function(){
          if(!this.classList.contains("selected-value")){
            this.classList.add("selected-value");
          }else{
            this.classList.remove("selected-value");
          }
        });
      }
    }
    private getSelectedValues():number[][]{
      let selectedValues: number[][];
      
      return selectedValues;
    }

}
