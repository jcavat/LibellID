import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Dragonfly } from '../../app/classes/dragonfly/dragonfly';
import { Camera } from '@ionic-native/camera';
import { Utils } from '../../providers/utils';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';

import { Diagnostic } from '@ionic-native/diagnostic';
import { ObservationListPage } from './observation-input-list/observation-input-list.component';



@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;
  private dragonflyName: string;
  private latitude: number;
  private longitude: number;
  private altitude: number;
  private nbIndividus: number = 1
  private checked: boolean = false;

  private imageFile: string;
  private imageNamePath: string;
  private dirName: string;
  private defaultPicture: string;
  private date: string;
  private timestamp: number;

  constructor(private camera: Camera,
    private geolocation: Geolocation,
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: HTTP,
    private diagnostic: Diagnostic,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.dragonfly = navParams.get("dragonfly");
  }



  ionViewWillEnter() {
    //init
    this.dragonflyName = "";
    this.imageFile = null//"./assets/img/camera.png";
    this.timestamp = Math.round(new Date().getTime() / 1000);

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

  galeriePicture() {
    const options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
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

  openDragonFlyList() {
    this.navCtrl.push(ObservationListPage);
  }

  addObservation() {

    //https://www.npmjs.com/package/oauth-1.0a



    const request = require('request');
    const OAuth = require('oauth-1.0a');
    const crypto = require('crypto');

    const consumer_key = 'XXX';
    const consumer_secret = 'XXX';
    const mail = "XXX";
    const mdp = "XXX";

    // Initialize
    const oauth = OAuth({
      consumer: {
        key: consumer_key,
        secret: consumer_secret
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
      }
    });
    var timest = new Date().getTime();

    const request_data = {
      url: 'https://www.ornitho.ch/api/observations?user_email=' + mail + '&user_pw=' + mdp,
      method: 'POST'

    };

    // Note: The token is optional for some requests
    const token = {
      key: 'https://www.ornitho.ch/index.php?m_id=1200&cmd=request_token',
      secret: ''
    };

    var h = oauth.toHeader(oauth.authorize(request_data, token))

    var options = {
      method: request_data.method,
      url: request_data.url,
      headers: h,
      body:
        {
          data:
            {
              sightings:
                [{
                  date: { '@timestamp': this.timestamp },
                  species: { '@id': this.dragonfly.id },
                  observers:
                    [{
                      '@id': '16189',
                      coord_lat: this.latitude,
                      coord_lon: this.longitude,
                      precision: 'precise',
                      estimation_code: 'EXACT_VALUE',
                      count: this.nbIndividus,
                      altitude: this.altitude
                    }]
                }]
            }
        },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

  };


  showConfirm() {
    if (this.dragonfly != undefined && this.altitude != undefined && this.longitude != undefined && this.altitude != undefined) {
      let confirm = this.alertCtrl.create({
        title: 'Saisir une observation',
        message: 'Voulez vous saisir l\'observation de la libellule ' + this.dragonfly.commonName + '?',
        buttons: [
          {
            text: 'Refuser',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Valider',
            handler: () => {
              if (this.altitude != undefined && this.longitude != undefined && this.altitude != undefined) {
                this.addObservation();
              } else {

              }
            }
          }
        ]
      });
      confirm.present();
    }
    else {
      this.presentToast("Les champs n'ont pas été tous renseignés!")
    }


  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });

    toast.present();
  }


  unknownChecked() {
    if (this.checked)
      this.nbIndividus = 0;
  }

}
