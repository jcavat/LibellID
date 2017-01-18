import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {AutrePage} from '../pages/autres/autres'
import {IdentifierPage} from '../pages/identifier/identifier';
import {PromenadesPage} from '../pages/promenades/promenades';
import {AidePage} from '../pages/aide/aide';
import {FichesInfoPage} from '../pages/fichesInfo/fichesInfo';
import {SaisieObservationPage} from '../pages/saisieObservation/saisieObservation';
import {PopoverIdentifier} from '../pages/identifier/popoverIdentifier';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutrePage,
    IdentifierPage,
    PromenadesPage,
    AidePage,
    FichesInfoPage,
    SaisieObservationPage,
    PopoverIdentifier
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
    PromenadesPage,
    AidePage,
    FichesInfoPage,
    SaisieObservationPage,
    PopoverIdentifier
  ],
  providers: []
})
export class AppModule {}
