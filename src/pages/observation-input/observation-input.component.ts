import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dragonfly } from '../../app/classes/dragonfly/dragonfly';
import { Camera } from '@ionic-native/camera';


@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;

  public imageFile: string;
  imageNamePath: string;
  dirName: string;
  defaultPicture: string;

  constructor(private camera: Camera,
              private navCtrl: NavController, 
              private navParams: NavParams) {
    this.dragonfly = navParams.get("dragonfly");
  }
  ionViewWillEnter(){
    if(this.dragonfly){
      console.log(this.dragonfly.commonName);
    }
    this.imageFile = "./assets/img/aeshna_affinis.jpg"
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

}
