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

  public getDragonflies(){
    let d: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        d = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.dragonflies);
        });
    }else{
        d = new Promise(function(resolve,reject){
            that.http.get('./json/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.dragonflies) ;
            });
        });
    }
    return d;
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

  public getWalks(){
    let w: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        w = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.walks);
        });
    }else{
        w = new Promise(function(resolve,reject){
            that.http.get('./json/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.walks) ;
            });
        });
    }
    return w;
  }

}
