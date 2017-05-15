import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {Geolocation, Network} from 'ionic-native';
import {HomePage} from '../../home/home.component';
import {Walk} from '../../../app/classes/walk/walk';
import ol from 'openlayers';
import {ModalInfoPoint} from './modal-info-point/modal-info-point.component';
import {IdentifyPage} from '../../identify/identify.component';

declare var cordova: any;


@Component({
  templateUrl: 'walk-in-progress.component.html'
})
export class WalkInProgressPage {
  private identifyPage = IdentifyPage;
  private walkData: Walk;
  private listenerPosition;
  private closestFeature: ol.Feature;
  private alertHasShownForFeature: boolean = false;
  private closestFeatureStyle: ol.style.Style = new ol.style.Style({
      image: new ol.style.Circle({
          radius: 10,
          fill: new ol.style.Fill({
              color: [247,35,12,0.3]
          }),
          stroke: new ol.style.Stroke({
              color: [247,35,12,0.9],
              width: 2
          })
      })
  });
  private defaultFeatureStyle: ol.style.Style = new ol.style.Style({
      image: new ol.style.Circle({
          radius: 10,
          fill: new ol.style.Fill({
              color: [56,126,245,0.3]
          }),
          stroke: new ol.style.Stroke({
              color: [56,126,245,0.9],
              width: 2
          })
      })
  });
  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private modalCtrl: ModalController) {
      this.walkData = this.navParams.get("walk");
  }

    private loadData(): void{

        let mapInProgress: ol.Map = new ol.Map({
            target: 'mapInProgress',
            view: new ol.View({
                zoom: 16
            }),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            controls: ol.control.defaults({
                zoom: true,
                attribution: false,
                rotate: true
            }).extend([
                new ol.control.ScaleLine()
            ])
        });
        let that = this;

        let kmlPath: ol.layer.Vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'assets/data/walks/'+this.walkData.pathKML,
                format: new ol.format.KML({
                    extractStyles: false
                })
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [100,100,100,1],
                    width: 3
                })
            })
        });
        let kmlPoints: ol.layer.Vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'assets/data/walks/'+this.walkData.pointsKML,
                format: new ol.format.KML({
                    extractStyles: false
                })
            }),
            style: this.defaultFeatureStyle
        });

        mapInProgress.addLayer(kmlPath);
        mapInProgress.addLayer(kmlPoints);

        mapInProgress.on('click', function(evt): void{
            let feature: ol.Feature = mapInProgress.forEachFeatureAtPixel(evt.pixel, function(feature: ol.Feature): ol.Feature{
                return feature;
            });
            if(feature && feature.getGeometryName() != 'position' && feature.get('name') != undefined){
                let modal = that.modalCtrl.create(ModalInfoPoint, {point: [feature.get('name'), feature.get('description')]});
                modal.present();
            }
        });

        let positionFeature: ol.Feature = new ol.Feature({
                geometryName: 'position'
            }
        );
        let positionVector: ol.layer.Vector = new ol.layer.Vector({
            map: mapInProgress,
            source: new ol.source.Vector({
                features: [positionFeature]
            })
        });
        mapInProgress.getView().setCenter(ol.proj.transform([that.walkData.coords[1], that.walkData.coords[0]],'EPSG:4326', 'EPSG:3857'));
        Geolocation.getCurrentPosition({
            enableHighAccuracy: true
        }).then(function(resp): void{
            positionFeature.setStyle(
                new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: '#3399CC'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#fff',
                            width: 2
                        })
                    })
                })
            );
            positionFeature.setGeometry(new ol.geom.Point(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857')));
        });

        this.listenerPosition = Geolocation.watchPosition({
            enableHighAccuracy: true
        }).subscribe(function(resp): void{
            positionFeature.setGeometry(new ol.geom.Point(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857')));
            let sourceVector: ol.source.Vector = kmlPoints.getSource();
            if(that.closestFeature != sourceVector.getClosestFeatureToCoordinate(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857'))){
                if(that.closestFeature != null)
                    that.closestFeature.setStyle(that.defaultFeatureStyle);
                that.closestFeature = sourceVector.getClosestFeatureToCoordinate(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857'));
                that.alertHasShownForFeature = false;
            }

            if(that.closestFeature != null){
                let sphereDistance: ol.Sphere = new ol.Sphere(6378137);
                // Distance = 10m.
                if((sphereDistance.haversineDistance([resp.coords.longitude, resp.coords.latitude],ol.proj.transform((that.closestFeature.getGeometry() as ol.geom.Point).getCoordinates(),'EPSG:3857','EPSG:4326'))) < 10 && !that.alertHasShownForFeature){
                    let modal = that.modalCtrl.create(ModalInfoPoint, {point: [that.closestFeature.get('name'), that.closestFeature.get('description')]});
                    modal.present();

                    that.alertHasShownForFeature = true;
                    that.closestFeature.setStyle(that.closestFeatureStyle);
                }
            }
        });

        document.getElementById('mapInProgress').style.height = mapInProgress.getSize()[1]+'px';
        document.getElementById('mapInProgress').style.width = mapInProgress.getSize()[0]+'px';
        mapInProgress.updateSize();
    }
    ionViewDidLoad(): void{
    //Charger points GPS
        if(Network.type != 'none'){
            this.loadData();
        }else{
            alert('Vous devez avoir une connexion internet pour afficher la carte.');
            this.navCtrl.pop();
        }
    }
    ionViewWillLeave(): void{
        if(Network.type != 'none')
            this.listenerPosition.unsubscribe();
    }
}
