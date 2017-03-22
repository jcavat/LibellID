import { Component } from '@angular/core';

import { NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../../home/home.component';
import {JsonDataService} from '../../../providers/data-json.service';
import {Walk} from '../../../app/classes/walk/walk';
import {WalkDetailPage} from '../walk-detail/walk-detail.component';
import { Geolocation } from 'ionic-native';

declare var cordova: any;
declare var ol: any;

@Component({
  templateUrl: 'walks-map.component.html'
})
export class WalksMapPage {
  private walksData: Walk[];
  constructor(private navCtrl: NavController, private jsonDataService: JsonDataService) {

  }
    private onSuccessGeolocation(position): void{
        alert(position.coords.latitude + " - " + position.coords.longitude);
    }
    private loadData(): void{
      let that = this;
      let iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'assets/img/position.png'
        }))
      });
        this.jsonDataService.walks().then(function(val){
           that.walksData = val as Walk[];
           let features = new Array(that.walksData.length);
           for(var i = 0; i < that.walksData.length; i++){
               features[i] = new ol.Feature({
                   'geometry': new ol.geom.Point(ol.proj.transform([that.walksData[i].coords[1], that.walksData[i].coords[0]],'EPSG:4326', 'EPSG:3857')),
                   'name': that.walksData[i].name,
                   'walk': that.walksData[i]
               });
               features[i].setStyle(iconStyle);

           }
           let vectorSource = new ol.source.Vector({
               features: features
           });
           var vector = new ol.layer.Vector({
               source: vectorSource
           });

           var map = new ol.Map({
               target: 'map',
               view: new ol.View({
                   center: ol.proj.transform([6.146692,46.204351],'EPSG:4326', 'EPSG:3857'),
                   zoom: 12
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
               var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature) {
                  return feature;
                });
                if (feature && feature.getProperties().name != "position") {
                    that.navCtrl.push(WalkDetailPage, {walk:feature.get('walk')});
                }
            });
            document.getElementById('map').style.height = map.getSize()[1]+'px';
            map.updateSize();
            var positionFeature = new ol.Feature({
                name: "position"
            });
            Geolocation.getCurrentPosition({enableHighAccuracy: true}).then(function(resp){
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
            });

            Geolocation.watchPosition({enableHighAccuracy: true}).subscribe(function(resp){
                positionFeature.setGeometry(new ol.geom.Point(ol.proj.transform([resp.coords.longitude, resp.coords.latitude],'EPSG:4326', 'EPSG:3857')));
            });
        }).catch(function(err){
            alert("Un problème est survenu")
        });
    }

  ionViewDidLoad(): void{
    //Charger points GPS
    this.loadData();

  }

}
