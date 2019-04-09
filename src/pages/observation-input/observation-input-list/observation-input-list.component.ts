import { Component } from '@angular/core';

import { App, ViewController } from 'ionic-angular';

import { JsonDataService } from '../../../providers/data-json.service';
import { Dragonfly } from '../../../app/classes/dragonfly/dragonfly';


@Component({
  templateUrl: 'observation-input-list.component.html'
})
export class ObservationListPage {
  private dragonfliesData: Dragonfly[];

  constructor(
    private jsonDataService: JsonDataService,
    public viewCtrl: ViewController,
    public appCtrl: App
  ) {
    this.loadData();
  }
  ionViewDidLoad() {

  }

  private loadData(): void {
    let that = this;
    this.jsonDataService.dragonflies().then(function (val) {
      that.dragonfliesData = val as Dragonfly[];
      that.dragonfliesData.sort(function compare(a, b) {
        return that.alphabeticSort(a.commonName, b.commonName);
      })
    }).catch(function (err) {
      alert("Un problème est survenu")
    });
  }
  private openPage(d: Dragonfly): void {
    this.viewCtrl.dismiss({ dragonfly: d });
  }

  private alphabeticSort(a, b) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
  }

}
