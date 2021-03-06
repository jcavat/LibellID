import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Dragonfly} from '../app/classes/dragonfly/dragonfly';
import {Walk} from '../app/classes/walk/walk';
import {File} from '@ionic-native/file';

import 'rxjs/add/operator/map';

/*
  Generated class for the JsonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JsonDataService {
  singleInstanceJsonData: any;
  constructor(public http: Http, private file:File) {

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

  public region(){
    let r: any;
    let that = this;
    if (this.singleInstanceJsonData) {
        r = new Promise(function(resolve,reject){
            resolve(that.singleInstanceJsonData.region);
        });
    }else{
        r = new Promise(function(resolve,reject){
            that.http.get('assets/data/libellID.json')
                .map(res => res.json())
                .subscribe(data => {
                    that.singleInstanceJsonData = data;
                    resolve(that.singleInstanceJsonData.region) ;
            });
        });
    }
    return r;
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
  public addWalk(name:string, path:string):boolean{
      alert(this.file.dataDirectory);
      let fileName = path.split("/").pop();
      let filePath = path.split("/");
      filePath.pop();
      alert(filePath.join("/") + " - " + fileName);
      let p = this.file.copyFile(filePath.join("/"), fileName, this.file.dataDirectory,"");
      p.then(resp => alert("ok")).catch(err => alert(err.message));
      this.file.checkFile(this.file.dataDirectory, "Test.txt").then(val => {return val});
      return true;
  }

}
