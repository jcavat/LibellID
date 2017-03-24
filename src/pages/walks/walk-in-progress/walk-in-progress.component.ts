import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {HomePage} from '../../home/home.component';
import {Walk} from '../../../app/classes/walk/walk';
import ol from 'openlayers';

declare var cordova: any;


@Component({
  templateUrl: 'walk-in-progress.component.html'
})
export class WalkInProgressPage {
  private walkData: Walk;
  constructor(private navCtrl: NavController, private navParams: NavParams) {

      this.walkData = this.navParams.get("walk");
  }

    private loadData(): void{
        let mapInProgress: ol.Map = new ol.Map({

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
        Geolocation.getCurrentPosition({enableHighAccuracy: true}).then(function(resp): void{
            let positionFeature: ol.Feature = new ol.Feature({
                    geometryName: 'position'
                }
            );
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
            let positionVector: ol.layer.Vector = new ol.layer.Vector({
                map: mapInProgress,
                source: new ol.source.Vector({
                    features: [positionFeature]
                })
            });
            mapInProgress.getView().setCenter(ol.proj.transform([that.walkData.coords[1], that.walkData.coords[0]],'EPSG:4326', 'EPSG:3857'));
        });
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
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: [56,126,245,0.3]
                    }),
                    stroke: new ol.style.Stroke({
                        color: [56,126,245,0.9],
                        width: 2
                    })
                })
            })
        });
        mapInProgress.addLayer(kmlPath);
        mapInProgress.addLayer(kmlPoints);
        mapInProgress.on('click', function(evt): void{
            let feature: ol.Feature = mapInProgress.forEachFeatureAtPixel(evt.pixel, function(feature: ol.Feature): ol.Feature{
                return feature;
            });
            if(feature && feature.getGeometryName() != 'position'){
                alert(feature.getProperties.name);
            }
        });
        mapInProgress.setTarget('mapInProgress');

    }
    ionViewDidLoad(): void{
    //Charger points GPS
        this.loadData();
    }

}
