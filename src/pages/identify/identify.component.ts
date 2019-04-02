import { Component } from '@angular/core';

import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { IdentifyPopover } from './identify-popover.component';
import { JsonDataService } from '../../providers/data-json.service';
import { IdentifyResultPage } from './identify-result/identify-result.component';
import { IdentifyModalInfo } from './identify-modal-info/identify-modal-info.component';
import { IdentifyModalCriter } from './identify-modal-criter/identify-modal-criter.component';
import { Storage } from '@ionic/storage';
import { PressDirective } from './press-directive';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
    templateUrl: 'identify.component.html'
})
export class IdentifyPage {
    private criteria: Object[];
    private useDate: boolean = false;
    private usePosition: boolean = false;
    private region: string = undefined;
    private latitude: number = undefined;
    private longitude: number = undefined;
    private altitude: number;
    private titleModalInfo:string="";
    private textModalInfo:string="";
    constructor(private navCtrl: NavController,
        private popoverCtrl: PopoverController,
        private jsonDataService: JsonDataService,
        private diagnostic: Diagnostic,
        private storage: Storage, private modalCtrl: ModalController,
        private nativeGeocoder: NativeGeocoder,
        private geolocation: Geolocation) {

        this.titleModalInfo="Aide à l’identification"
        this.textModalInfo= "<p>Cette rubrique vous permet d’identifier les libellules les plus communes de Suisse romande.</p> <p>Vous pouvez sélectionner <b>une ou plusieurs options</b>  pour chaque critère.</p> <p>Il n’est <b> pas</b> obligatoire de répondre à <b>tous</b> les critères.</p> <p>En maintenant le <b>doigt appuyé</b> sur une option, celle-ci s’affiche en plus grand avec une brève description.</p> <p>Pour visualiser <b> quelle libellule </b> correspond à vos réponses aux options, cliquez sur le bouton « Voir ».</p>"
            
        this.loadData();
    }
    private presentPopover(event): void {
        let popover = this.popoverCtrl.create(IdentifyPopover, {
            useDate: this.useDate,
            usePosition: this.usePosition
        });
        popover.present({ ev: event });
        popover.onDidDismiss(data => {
            if (data != null) {
                this.useDate = data.useDate;
                this.usePosition = data.usePosition;
            }
        });
    }

    private loadData(): void {
        let that = this;
        this.jsonDataService.criteria().then(function (val) {
            that.criteria = val;
        }).catch(function (err) {
            alert("Un problème est survenu")
        });


        this.diagnostic.isGpsLocationEnabled().then((isAvailable) => {
            if (!isAvailable) {
                alert("Votre position GPS n'est pas activé");
                this.diagnostic.switchToLocationSettings()
            }

        }
        ).catch((e) => console.error(e));

        //get geoloc
        this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            this.altitude = resp.coords.altitude;
            console.log(this.altitude)

            //parse lat long to geocod
            this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
                .then((result: NativeGeocoderReverseResult[]) => {
                    this.region = result[0].administrativeArea;
                }).catch((error) => {
                    console.log(error);
                });

        }).catch((error: any) => {
            alert("La position GPS est introuvable, veuillez activez votre GPS");
        });
    }

    private handleClickValue(event: Event): void {
        let element = <HTMLElement>event.target;
        if (element.tagName != "TD") {
            element = element.parentElement;
        }
        if (!element.classList.contains("selected-value")) {
            element.classList.add("selected-value");
        } else {
            element.classList.remove("selected-value");
        }
    }
    private resetCriteria(): void {
        let tables = document.getElementsByClassName("table-criteria");
        for (var i = 0; i < tables.length; i++) {
            let elems = tables[i].getElementsByTagName("td");
            for (var j = 0; j < elems.length; j++) {
                elems[j].classList.remove("selected-value");
            }
        }
    }
    private pressEvent(value: Object): void {
        let modal = this.modalCtrl.create(IdentifyModalCriter, { value: value });
        modal.present();
    }
    private displayModalInfo(title:string,text:string): void {
        let modal = this.modalCtrl.create(IdentifyModalInfo, {title:title, text:text});
        modal.present();
    }

    ionViewDidEnter() {
        let tdValues = document.getElementsByClassName("criter-value");
        for (var i = 0; i < tdValues.length; i++) {
            tdValues[i].removeEventListener("click", this.handleClickValue);
            tdValues[i].addEventListener("click", this.handleClickValue);
        }
        this.storage.get('firstTimeIdentification').then((val) => {
            if (val == null || val == undefined || val == true) {
                this.displayModalInfo(this.titleModalInfo,this.textModalInfo);
                this.storage.set('firstTimeIdentification', false);
            }
        });
    }
    private getSelectedValues(): void {
        let selectedValues: number[][] = [];
        let tables = document.getElementsByClassName("table-criteria");
        for (var i = 0; i < tables.length; i++) {
            let selectedValuesPerCriter: number[] = [];
            let selectedElements = tables[i].getElementsByClassName("selected-value");
            for (var j = 0; j < selectedElements.length; j++) {
                selectedValuesPerCriter.push((<HTMLTableCellElement>selectedElements[j]).cellIndex);
            }
            selectedValues.push(selectedValuesPerCriter);
        }
        this.navCtrl.push(IdentifyResultPage, {
            criteria: selectedValues,
            region: this.region,
            altitude: this.altitude,
            useDate: this.useDate,
            usePosition: this.usePosition
        });
    }

}
