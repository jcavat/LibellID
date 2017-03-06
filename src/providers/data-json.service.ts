import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Dragonfly} from '../app/classes/dragonfly/dragonfly.class';
import {Walk} from '../app/classes/walk/walk.class';

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

  public dragonflies(): Promise<Dragonfly[]>{
    let d: Promise<Dragonfly[]>;
    let that = this;
    if (this.singleInstanceJsonData) {
        d = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.dragonflies);
        });
    }else{
        d = new Promise(function(resolve,reject){
            that.http.get('assets/data/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.dragonflies) ;
            });
        });
    }
    return d;
  }

  public criteria(){
    let c: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        c = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.criteria);
        });
    }else{
        c = new Promise(function(resolve,reject){
            that.http.get('assets/data/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.criteria) ;
            });
        });
    }
    return c;
  }

  public walks(): Promise<Walk[]>{
    let w: Promise<Walk[]>;
    let that = this;
    if (this.singleInstanceJsonData) {
        w = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.walks);
        });
    }else{
        w = new Promise(function(resolve,reject){
            that.http.get('assets/data/libellID.json')
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
