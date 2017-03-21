import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {HomePage} from '../../home/home.component';
import {Walk} from '../../../app/classes/walk/walk.class';

declare var cordova: any;
declare var ol: any;

@Component({
  templateUrl: 'walk-in-progress.component.html'
})
export class WalkInProgressPage {
  private walkData: Walk;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.walkData = this.navParams.get("walk");
  }

    private loadData(): void{
        var map = new ol.Map({
            target: 'map',
            view: new ol.View({
                zoom: 12
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

        Geolocation.getCurrentPosition({enableHighAccuracy: true}).then(function(resp){
            var positionFeature = new ol.Feature();
            positionFeature.setStyle(new ol.style.Style({
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
            }));
            positionFeature.setGeometry(new ol.geom.Point(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857')));
            new ol.layer.Vector({
                map: map,
                source: new ol.source.Vector({
                    features: [positionFeature]
                })
            });
            map.getView().setCenter(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857'));
        });
        var kml = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'assets/kml/'+this.walkData.pathKML,
                format: new ol.format.KML({
                    extractStyles: false
                })
            })
        });
        map.addLayer(kml);
        map.on('click', function(evt){
            var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
                return feature;
            });
            if(feature){
                alert(feature.getProperties.name);
            }
        });

    }
    ionViewDidLoad(): void{
    //Charger points GPS
        this.loadData();
    }

}
