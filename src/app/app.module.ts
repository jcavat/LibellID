
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { GlobalService } from './globalService';
import { HomePage } from '../pages/home/home';
import {AutrePage} from '../pages/autres/autres'
import {IdentifierPage} from '../pages/identifier/identifier';
import {PromenadesCartePage} from '../pages/promenades/promenadesCarte/promenadesCarte';
import {PromenadesListePage} from '../pages/promenades/promenadesListe/promenadesListe';
import {AidePage} from '../pages/aide/aide';
import {FichesInfoPage} from '../pages/fichesInfo/fichesInfo';
import {SaisieObservationPage} from '../pages/saisieObservation/saisieObservation';
import {PopoverIdentifier} from '../pages/identifier/popoverIdentifier';
import {PopoverPromenades} from '../pages/promenades/popoverPromenades';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutrePage,
    IdentifierPage,
    PromenadesCartePage,
    PromenadesListePage,
    AidePage,
    FichesInfoPage,
    SaisieObservationPage,
    PopoverIdentifier,
    PopoverPromenades
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutrePage,
    IdentifierPage,
    PromenadesCartePage,
    PromenadesListePage,
    AidePage,
    FichesInfoPage,
    SaisieObservationPage,
    PopoverIdentifier,
    PopoverPromenades
  ],
  providers: [
    GlobalService
  ]
})
export class AppModule {}
