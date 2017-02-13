import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the JsonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JsonDataService {
  singleInstanceJsonData: any;
  constructor(public http: Http) {

  }

  public getLibellules(){
      if (this.singleInstanceJsonData) {
        return Promise.resolve(this.singleInstanceJsonData.libellules);
      }

      return new Promise(resolve => {
        this.http.get('./json/libellID.json')
          .map(res => res.json())
          .subscribe(data => {
              this.singleInstanceJsonData = data;
              resolve(this.singleInstanceJsonData.libellules);
          });
      });
  }

  public getPromenadess(){
      if (this.singleInstanceJsonData) {
        return Promise.resolve(this.singleInstanceJsonData.promenades);
      }

      return new Promise(resolve => {
        this.http.get('./json/libellID.json')
          .map(res => res.json())
          .subscribe(data => {
              this.singleInstanceJsonData = data;
              resolve(this.singleInstanceJsonData.promenades);
          });
      });
  }

}
