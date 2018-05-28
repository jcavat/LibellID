import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home.component';
import { JsonDataService } from '../providers/data-json.service';
import { LocationTrackerProvider } from '../providers/location-tracker';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [JsonDataService]
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private locationTracker: LocationTrackerProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      if (Splashscreen) {
        setTimeout(() => { Splashscreen.hide(); }, 100);
      }
      /*
      platform.pause.subscribe(()=>{
        this.locationTracker.stopTracking();
        console.log("STOP APP")
      })*/

    });
  }
}
