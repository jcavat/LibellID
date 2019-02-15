import { Component } from '@angular/core';

import { NavController, NavParams, App} from 'ionic-angular';
import {HomePage} from '../../home/home.component';
import {JsonDataService} from '../../../providers/data-json.service';
import {Walk} from '../../../app/classes/walk/walk';
import {WalkDetailPage} from '../walk-detail/walk-detail.component';
import { Geolocation, Network } from 'ionic-native';
import ol from 'openlayers';

declare var cordova: any;


@Component({
  templateUrl: 'walks-map.component.html'
})
export class WalksMapPage {
  private walksData: Walk[];
  constructor(private navCtrl: NavController, private jsonDataService: JsonDataService, private appCtrl: App) {

  }

    private loadData(): void{
      let that = this;
      let positionIcon : ol.style.Icon = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'assets/img/position-full.png'
      }));
        this.jsonDataService.walks().then(function(val){
           that.walksData = val as Walk[];
           let features: ol.Feature[] = new Array(that.walksData.length);
           for(var i = 0; i < that.walksData.length; i++){
               features[i] = new ol.Feature({
                   'geometry': new ol.geom.Point(ol.proj.transform([that.walksData[i].coords[1], that.walksData[i].coords[0]],'EPSG:4326', 'EPSG:3857')),
                   'geometryName': that.walksData[i].name,
                   'walk': that.walksData[i]
               });
               let iconStyle: ol.style.Style = new ol.style.Style({
                image: positionIcon,
                text: new ol.style.Text({
                    text: ""+that.walksData[i].id,
                    scale: 2.4,
                    offsetY: -31,
                    fill: new ol.style.Fill({color:'white'}),
                    stroke: new ol.style.Stroke({color: 'black', width: 1})
                }),
                stroke: new ol.style.Stroke({
                    color: [100,0,0,1]
                })
              });
              features[i].setStyle(iconStyle);

           }
           let vectorSource: ol.source.Vector = new ol.source.Vector({
               features: features
           });
           let vector: ol.layer.Vector = new ol.layer.Vector({
               source: vectorSource
           });

           let map: ol.Map = new ol.Map({
               target: 'map',
               view: new ol.View({
                   center: ol.proj.transform([6.146692,46.204351],'EPSG:4326', 'EPSG:3857'),
                   zoom: 10
               }),
               layers: [
                   new ol.layer.Tile({
                       source: new ol.source.OSM()
                   }),
                   vector
               ],
               controls: ol.control.defaults({
                   zoom: true,
                   attribution: false,
                   rotate: true
               }).extend([
                   new ol.control.ScaleLine()
               ])
           });
            map.on('click', function(evt) {
               let feature: ol.Feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature: ol.Feature):ol.Feature {
                  return feature;
                });
                if (feature && feature.getGeometryName() != 'position') {
                    that.appCtrl.getRootNav().push(WalkDetailPage, {walk: feature.get('walk')});
                }
            });
            document.getElementById('map').style.height = map.getSize()[1]+'px';
            map.updateSize();
            var positionFeature: ol.Feature = new ol.Feature();
            Geolocation.getCurrentPosition({enableHighAccuracy: true}).then(function(resp): void{
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
                positionFeature.setGeometryName('position');
                new ol.layer.Vector({
                    map: map,
                    source: new ol.source.Vector({
                        features: [positionFeature]
                    })
                });
            });

            Geolocation.watchPosition({enableHighAccuracy: true}).subscribe(function(resp): void{
                positionFeature.setGeometry(new ol.geom.Point(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857')));
            });
        }).catch(function(err){
            alert("Un problème est survenu")
        });
    }

  ionViewDidLoad(): void{
    /**
     * Even if there's no connection available,
     * the app allows the user to view the walking path without the map.
     */
    if(Network.type == 'none'){
        alert('Vous devez avoir une connexion internet pour afficher la carte.');
    }

    this.loadData();

  }

}
