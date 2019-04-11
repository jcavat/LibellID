
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { LinkyModule } from 'angular-linky';

import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import {JsonDataService} from '../providers/data-json.service';
import { HomePage } from '../pages/home/home.component';
import {HomeModalInfo} from '../pages/home/home-modal-info/home-modal-info.component';
import {OtherPage} from '../pages/other/other.component'
import {IdentifyPage} from '../pages/identify/identify.component';
import {IdentifyResultPage} from '../pages/identify/identify-result/identify-result.component';
import {IdentifyModalInfo} from '../pages/identify/identify-modal-info/identify-modal-info.component';
import {IdentifyModalCriter} from '../pages/identify/identify-modal-criter/identify-modal-criter.component';
import {ObservationListPage} from '../pages/observation-input/observation-input-list/observation-input-list.component'
import {WalksPage} from '../pages/walks/walks.component';
import {WalksMapPage} from '../pages/walks/walks-map/walks-map.component';
import {WalksListPage} from '../pages/walks/walks-list/walks-list.component';
import {WalkDetailPage} from '../pages/walks/walk-detail/walk-detail.component';
import {WalkInProgressPage} from '../pages/walks/walk-in-progress/walk-in-progress.component';
import {ModalInfoPoint} from '../pages/walks/walk-in-progress/modal-info-point/modal-info-point.component';
import {ModalAddWalk} from '../pages/walks/walks-list/modal-add-walk/modal-add-walk.component';
import {HelpPage} from '../pages/help/help.component';
import {InfoSheetPage} from '../pages/info-sheet/info-sheet.component';
import {ObservationInputPage} from '../pages/observation-input/observation-input.component';
import {DragonflyPage} from '../pages/dragonfly/dragonfly.component';
import {DragonflyHomeTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-home-tab/dragonfly-home-tab.component';
import {DragonflyPicturesTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-pictures-tab/dragonfly-pictures-tab.component';
import {DragonflyInfoTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-info-tab/dragonfly-info-tab.component';
import {DragonflyDistributionTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-distribution-tab/dragonfly-distribution-tab.component';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import {IonicStorageModule} from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import {Utils} from '../providers/utils';
import { Vibration } from '@ionic-native/vibration';
import { PressDirective } from '../pages/identify/press-directive';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeModalInfo,
    OtherPage,
    IdentifyPage,
    IdentifyResultPage,
    IdentifyModalInfo,
    IdentifyModalCriter,
    PressDirective,
    ObservationListPage,
    WalksPage,
    WalksMapPage,
    WalksListPage,
    WalkDetailPage,
    WalkInProgressPage,
    ModalInfoPoint,
    ModalAddWalk,
    HelpPage,
    InfoSheetPage,
    ObservationInputPage,
    DragonflyPage,
    DragonflyHomeTabPage,
    DragonflyPicturesTabPage,
    DragonflyInfoTabPage,
    DragonflyDistributionTabPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    LinkyModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeModalInfo,
    OtherPage,
    IdentifyPage,
    IdentifyResultPage,
    IdentifyModalInfo,
    IdentifyModalCriter,
    ObservationListPage,
    WalksPage,
    WalksMapPage,
    WalksListPage,
    WalkDetailPage,
    WalkInProgressPage,
    ModalInfoPoint,
    ModalAddWalk,
    HelpPage,
    InfoSheetPage,
    ObservationInputPage,
    DragonflyPage,
    DragonflyHomeTabPage,
    DragonflyPicturesTabPage,
    DragonflyInfoTabPage,
    DragonflyDistributionTabPage
  ],
  providers: [
    Camera,
    Diagnostic,
    Geolocation,
    JsonDataService,
    File,
    HTTP,
    NativeGeocoder,
    Utils,
    Vibration
  ]
})
export class AppModule {}
