import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dragonfly } from '../../app/classes/dragonfly/dragonfly';
import { Camera } from '@ionic-native/camera';
import { Utils } from '../../providers/utils';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';

import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;
  private dragonflyName: string;
  private latitude: number;
  private longitude: number;

  public imageFile: string;
  imageNamePath: string;
  dirName: string;
  defaultPicture: string;
  date: string;

  constructor(private camera: Camera,
    private geolocation: Geolocation,
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: HTTP,
    private diagnostic: Diagnostic,
    private toastCtrl: ToastController) {
    this.dragonfly = navParams.get("dragonfly");
  }
  ionViewWillEnter() {
    //init
    this.dragonflyName = "";
    this.imageFile = "./assets/img/camera.png";
    this.date = Utils.getCurrentDatetime('dd/MM/y')
    if (this.dragonfly) {
      this.dragonflyName = this.dragonfly.commonName.toString();
    }

    this.diagnostic.isGpsLocationEnabled().then((isAvailable) => {
      if (!isAvailable) {
        alert("Votre position GPS n'est pas activé");
        this.diagnostic.switchToLocationSettings()
      }

    }
    ).catch((e) => console.error(e));

    //get geoloc
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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

  addObservation() {

    if (this.latitude == null || this.longitude == null) {
      this.presentToast("Votre appareil n'as pas eu le temps de récupérer la géolocalisation, où alors votre GPS n'est pas activé");
    } else {
      this.presentToast("On enverra l'observation");
    }
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
