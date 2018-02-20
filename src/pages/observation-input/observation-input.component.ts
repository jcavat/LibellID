import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dragonfly } from '../../app/classes/dragonfly/dragonfly';
import { Camera } from '@ionic-native/camera';
import { Utils } from '../../providers/utils';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';

import { Diagnostic } from '@ionic-native/diagnostic';

// Dependencies
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;
  private dragonflyName: string;
  private latitude: number;
  private longitude: number;
  private altitude: number;
  private nbIndividus: number = 0
  private checked: boolean = false;

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
    private diagnostic: Diagnostic) {
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
      this.altitude = resp.coords.altitude;
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
    // Initialize
    const oauth = OAuth({
      consumer: {
        key: '4814fb5d1d2424e7e987cd6466b9442f0598de06a',
        secret: '65ff236a8a3b674a26d4ce601c28c038'
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
      }
    });

    const request_data = {
      url: "https://www.ornitho.ch/api/species",
      method: "GET",
      data: {
        user_email: "libellulid@hesge.ch",
        user_pwd: "bodilus856"
      }
    };

    // Note: The token is optional for some requests
    const token = {
      key: 'b7944483876df6d134af985fcb42166205a831bf0',
      secret: '5c6650a140db6e0971c545aef1838a90'
    };

    request({
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    }, function (error, response, body) {
      console.log(response)
      console.log(error)
      console.log(body)
      // Process your data here
    });
    if (this.latitude == null || this.longitude == null) {



      /*alert("Votre appareil n'as pas eu le temps de récupérer la géolocalisation, où alors votre GPS n'est pas activé");
      let datas = {
        "data": {
          "sightings": [{
            "date": { "@timestamp": Date.now() },
            "species": { "@id": "86" },
            "observers": [{
              "@id": "%replace by id_observer%",
              "coord_lat": +this.latitude,
              "coord_lon": +this.longitude,
              "count": +this.nbIndividus,
              "altitude": +this.altitude
            }]
          }]
        }
      }
      let headers = {
        'Content-Type': 'application/json'
      };
      console.log(datas)
      //this.http.post("https://www.ornitho.ch/api/observations/search?user_email=libellulid@hesge.ch&user_pwd=xxxx", datas, headers);*/
    } else {
      alert("On enverra l'observation");
    }


  }

  unknownChecked() {
    if (this.checked)
      this.nbIndividus = 0;
  }

}
