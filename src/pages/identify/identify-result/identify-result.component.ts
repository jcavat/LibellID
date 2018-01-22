import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { JsonDataService } from '../../../providers/data-json.service';
import { DragonflyPage } from '../../dragonfly/dragonfly.component';
import { Dragonfly } from '../../../app/classes/dragonfly/dragonfly';
import { Utils } from '../../../providers/utils';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';


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
  private latitude:number;
  private longitude:number;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private jsonDataService: JsonDataService,
              private nativeGeocoder: NativeGeocoder,
              private geolocation: Geolocation) {
    this.criteria = navParams.get("criteria");
    this.useDate = navParams.get("useDate");
    this.usePosition = navParams.get("usePosition");
    this.loadData();
  }
  private loadData(): void {
    let that = this;
    let numberOfCriteriaPerDragonfly: number[]
    this.jsonDataService.dragonflies().then(function (val) {
      that.dragonfliesData = val as Dragonfly[];
      //alphabetic sort
      that.dragonfliesData.sort(function compare(a, b) {
        return that.alphabeticSort(a.commonName, b.commonName);
      });
      console.log(that.dragonfliesData)

      //filter date
      if (that.useDate) {
        that.dragonfliesData = that.filterByDate(that.dragonfliesData);
      }
      
      //filter geoloc
      /*if(that.usePosition){
        that.filterGeoloc(that.dragonfliesData);
      }*/

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
    }).catch(function (err: Error) {
      alert("Un problème est survenu\n" + err.name + "\n" + err.message)
    });
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

  private filterGeoloc(dragonflies)
  {
    //get region acronym
    this.jsonDataService.region().then(function (val) {
      let regions = val as Object[];
      let regionJSON; 

      //browse the regions
      for(let i=0; i<regions.length; i++){
        regionJSON = regions[i];
        for(let regionKey in regions[i]){
          //if region are find
          if(regionJSON[regionKey] == "Genève"){
            console.log(regionKey)
            //filter by key geoloc in json (exemple filter by 'GE')
            //return dragonflies.filter(dragonfly=>  dragonfly.flyPeriod[dateIndex][0] > 0 || 
            //                          dragonfly.flyPeriod[dateIndex][1] > 0 || 
            //                          dragonfly.flyPeriod[dateIndex][2] > 0 || 
            //                          dragonfly.flyPeriod[dateIndex][3] > 0 );
          }
        }
      }
    }).catch(function (err: Error) {
      alert("Un problème est survenu\n" + err.name + "\n" + err.message)
    });

/*

    //get geoloc
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      
      //parse lat long to geocod
      this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
      .then((result: NativeGeocoderReverseResult) => {
          console.log(JSON.stringify(result))
          
          
        
      })
      .catch((error: any) => console.log(error));

    }).catch((error) => {
       console.log('Error getting location', error);
    });
*/
    
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
}
