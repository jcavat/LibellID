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
    let l: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        l = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.libellules);
        });
    }else{
        l = new Promise(function(resolve,reject){
            that.http.get('./json/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.libellules) ;
            });
        });
    }
    return l;
  }

  public getCriteres(){
    let c: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        c = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.criteres);
        });
    }else{
        c = new Promise(function(resolve,reject){
            that.http.get('./json/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.criteres) ;
            });
        });
    }
    return c;
  }

  public getPromenades(){
    let p: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        p = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.promenades);
        });
    }else{
        p = new Promise(function(resolve,reject){
            that.http.get('./json/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.promenades) ;
            });
        });
    }
    return p;
  }

}
