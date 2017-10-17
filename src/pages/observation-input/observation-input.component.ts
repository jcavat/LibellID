import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dragonfly } from '../../app/classes/dragonfly/dragonfly';
import { Camera } from '@ionic-native/camera';
import { Utils } from '../../providers/utils';
import { HTTP } from '@ionic-native/http';


@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;

  public imageFile: string;
  imageNamePath: string;
  dirName: string;
  defaultPicture: string;
  date:string;

  constructor(private camera: Camera,
              private navCtrl: NavController, 
              private navParams: NavParams,
              private http: HTTP) {
    this.dragonfly = navParams.get("dragonfly");
  }
  ionViewWillEnter(){
    if(this.dragonfly){
      console.log(this.dragonfly.commonName);
    }
    this.imageFile = "./assets/img/camera.png";
    this.date=Utils.getCurrentDatetime('dd/MM/y')
  }


  takePicture() {
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 90,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000, //TODO: check if it necessary to resize picture, and if so, set correct values
      targetHeight: 1000,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((pictureAsBinary) => {
      //read new image
      this.imageFile = "data:image/jpeg;base64," + pictureAsBinary;
      
    }, (err) => {
    });
  }

  addObservation(){
    /*this.http.get('http://ionic.io', {}, {})
    .then(data => {
  
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
  
    })
    .catch(error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });*/
  }

}
