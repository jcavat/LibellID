import { Component } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { NavController, NavParams, AlertController, ToastController, Platform } from 'ionic-angular';
import { Dragonfly } from '../../app/classes/dragonfly/dragonfly';
import { Camera } from '@ionic-native/camera';
import { Utils } from '../../providers/utils';
import { HTTP } from '@ionic-native/http';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ObservationListPage } from './observation-input-list/observation-input-list.component';
import { Geolocation } from '@ionic-native/geolocation';




@Component({
  templateUrl: 'observation-input.component.html'
})
export class ObservationInputPage {
  private dragonfly: Dragonfly;
  private dragonflyName: string;
  private nbIndividus: number = 1
  private checked: boolean = false;
  private imageFile: string;
  private imageNamePath: string;
  private dirName: string;
  private defaultPicture: string;
  private date: string;
  private timestamp: number;
  private latitude: number = undefined;
  private longitude: number = undefined;
  private altitude: number;

  constructor(private camera: Camera,
    private diagnostic:Diagnostic,
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private http: HTTP,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public toastCtrl: ToastController) {

    this.dragonfly = navParams.get("dragonfly");

    this.diagnostic.isGpsLocationEnabled().then((isAvailable) => {
      if (!isAvailable) {
        alert("Votre position GPS n'est pas activé");
        this.diagnostic.switchToLocationSettings()
        
      }
    }).catch((e) => console.error(e));

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.altitude = resp.coords.altitude;
      alert(resp.coords.latitude);
      alert(resp.coords);
      alert(this.altitude);
    }).catch((error: any) => {
        alert("La position GPS est introuvable, veuillez activez votre GPS");
    });

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

  hasGPSValues(): boolean {
    if (this.longitude != undefined && this.latitude != undefined) {
      return true;
    } else {
      return false;
    }
  }

  showConfirm() {
    console.log(this.altitude)
    console.log(this.longitude)
    console.log(this.latitude)

    if (this.dragonfly != undefined && this.hasGPSValues()) {
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
              if (this.hasGPSValues()) {
                this.addObservation();
                this.navCtrl.popToRoot();
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
