import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import { JsonDataService } from '../../../providers/data-json.service';
import { DragonflyPage } from '../../dragonfly/dragonfly.component';
import { Dragonfly } from '../../../app/classes/dragonfly/dragonfly';
import { Utils } from '../../../providers/utils';
import { IdentifyModalInfo } from '../identify-modal-info/identify-modal-info.component';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'identify-result.component.html'
})
export class IdentifyResultPage {
  private dragonfliesData: Dragonfly[];
  private criteria: number[][];
  private matchedCriteria: boolean[][] = [];
  private dragonfliesDataSorted = [];
  private criteriaSelected: number = 0;
  private useDate: boolean;
  private usePosition: boolean;
  private region: string = undefined;
  private altitude: number = undefined;
  private titleModalInfo:string="";
  private textModalInfo:string="";

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private storage: Storage,
    private jsonDataService: JsonDataService) {

    this.criteria = navParams.get("criteria");
    this.useDate = navParams.get("useDate");
    this.usePosition = navParams.get("usePosition");
    this.region = navParams.get("region");
    this.altitude = navParams.get("altitude");
    this.titleModalInfo="Résultats de votre identification"
    this.textModalInfo= "<p> Cette rubrique <b>classe</b> les libellules auxquelles celle que vous avez observé correspond le mieux.</p> <p>Les <b>chiffres</b> à droite de chaque libellule potentielle correspondent au nombre de critères en adéquation avec vos choix par rapport au nombre de critères totaux que vous avez sélectionné.</p> <p> En <b>cliquant</b> sur une libellule, vous pouvez obtenir plus d’informations et vérifier ou non votre identification.</p>"
    
    this.storage.get('firstTimeResInfo').then((val) => {
      if (val == null || val == undefined || val == true) {
          this.displayModalInfo(this.titleModalInfo,this.textModalInfo);
          this.storage.set('firstTimeResInfo', false);
      }
    });
    this.loadData();
  }
  private loadData(): void {
    let that = this;

    this.jsonDataService.dragonflies().then(function (val) {
      that.dragonfliesData = val as Dragonfly[];
      //alphabetic sort
      that.dragonfliesData.sort(function compare(a, b) {
        return that.alphabeticSort(a.commonName, b.commonName);
      });

      //filter date
      if (that.useDate) {
        that.dragonfliesData = that.filterByDate(that.dragonfliesData);
      }

      //filter by geoloc
      if (that.region !== undefined) {
        that.dragonfliesData = that.filterGeoloc(that.dragonfliesData, that.region);
      }

      //filter by altitude
      if (that.usePosition && that.altitude !== undefined) {
        that.dragonfliesData = that.filterAltitude(that.dragonfliesData, that.altitude);
      }

      that.sortWithMatchedCriteria(that.dragonfliesData, that.criteria, that);

    }).catch(function (err: Error) {
      alert("Un problème est survenu\n" + err.name + "\n" + err.message)
    });
  }

  sortWithMatchedCriteria(dragonfliesData, criteria, that) {
    for (var i = 0; i < that.dragonfliesData.length; i++) {
      let dragonflyMatchedCriteria: boolean[] = []
      for (var j = 0; j < that.criteria.length; j++) {
        dragonflyMatchedCriteria[j] = that.dragonfliesData[i].criteria[j].some(function (v) {
          return that.criteria[j].indexOf(v) >= 0;
        });
      }
      that.matchedCriteria[i] = dragonflyMatchedCriteria;
      that.dragonfliesDataSorted[i] = [that.dragonfliesData[i], that.trueCount(that.matchedCriteria[i])];
    }

    //sort with score
    that.dragonfliesDataSorted.sort(function (a, b) {
      if (b[1] - a[1] != 0) {//score are not equal=>sort by score
        return b[1] - a[1];
      } else { //alpabetic sort
        return that.alphabeticSort(a[0].commonName, b[0].commonName);
      }
    });


    for (var i = 0; i < that.criteria.length; i++) {
      if (that.criteria[i].length != 0) {
        that.criteriaSelected++;
      }
    }
  }


  private filterByDate(dragonflies) {
    //Avril to November (avril index = 0, november index = 7)
    let dateIndex = Utils.getCurrentDateIndex();

    //if dateIndex are not in december to march
    if (dateIndex != -1) {
      //filter by date in json
      return dragonflies.filter(dragonfly => dragonfly.flyPeriod[dateIndex][0] > 0 ||
        dragonfly.flyPeriod[dateIndex][1] > 0 ||
        dragonfly.flyPeriod[dateIndex][2] > 0 ||
        dragonfly.flyPeriod[dateIndex][3] > 0);
    }
    //no filter by date
    return dragonflies;

  }

  private filterGeoloc(dragonflies, regionName) {
    //if region are find in region key
    if (regionName === "Genève") {
      return dragonflies.filter(dragonfly => dragonfly.region.includes('GE'));
    } else {
      return dragonflies.filter(dragonfly => dragonfly.region.includes('RO'));
    }
  }

  private filterAltitude(dragonflies, altitude) {
    //if region are find in region key
    if (altitude < 1600) {
      return dragonflies.filter(dragonfly => dragonfly.altitude_level[0] == 0);
    } else if (altitude >= 1600 && altitude <= 2000) {
      return dragonflies.filter(dragonfly => dragonfly.altitude_level[1] == 1);
    } else {
      return dragonflies.filter(dragonfly => dragonfly.altitude_level[2] == 2);
    }
  }

  private alphabeticSort(a, b) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
  }

  private trueCount(arr: boolean[]): number {
    let numberOfTrue: number = 0;
    arr.forEach(function (value) {
      if (value) {
        numberOfTrue++;
      }
    })
    return numberOfTrue
  }

  private openPage(d: Dragonfly, c): void {
    this.navCtrl.push(DragonflyPage, { dragonfly: d, criteria: c });
  }

  private displayModalInfo(title:string,text:string): void {
    let modal = this.modalCtrl.create(IdentifyModalInfo, {title:title, text:text});
    modal.present();
  }

}
