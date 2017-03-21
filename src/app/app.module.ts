
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import {JsonDataService} from '../providers/data-json.service';
import { HomePage } from '../pages/home/home.component';
import {OtherPage} from '../pages/other/other.component'
import {IdentifyPage} from '../pages/identify/identify.component';
import {WalksPage} from '../pages/walks/walks.component';
import {WalksMapPage} from '../pages/walks/walks-map/walks-map.component';
import {WalksListPage} from '../pages/walks/walks-list/walks-list.component';
import {WalkDetailPage} from '../pages/walks/walk-detail/walk-detail.component';
import {WalkInProgressPage} from '../pages/walks/walk-in-progress/walk-in-progress.component';
import {HelpPage} from '../pages/help/help.component';
import {InfoSheetPage} from '../pages/info-sheet/info-sheet.component';
import {ObservationInputPage} from '../pages/observation-input/observation-input.component';
import {DragonflyPage} from '../pages/dragonfly/dragonfly.component';
import {DragonflyHomeTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-home-tab/dragonfly-home-tab.component';
import {DragonflyPicturesTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-pictures-tab/dragonfly-pictures-tab.component';
import {DragonflyInfoTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-info-tab/dragonfly-info-tab.component';
import {DragonflyDistributionTabPage} from '../pages/dragonfly/dragonfly-tabs/dragonfly-distribution-tab/dragonfly-distribution-tab.component';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OtherPage,
    IdentifyPage,
    WalksPage,
    WalksMapPage,
    WalksListPage,
    WalkDetailPage,
    WalkInProgressPage,
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
    IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OtherPage,
    IdentifyPage,
    WalksPage,
    WalksMapPage,
    WalksListPage,
    WalkDetailPage,
    WalkInProgressPage,
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
    JsonDataService
  ]
})
export class AppModule {}
