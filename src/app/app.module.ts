
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { GlobalService } from './globalService';
import {JsonDataService} from '../providers/jsonDataService';
import { HomePage } from '../pages/home/home';
import {AutrePage} from '../pages/autres/autres'
import {IdentifierPage} from '../pages/identifier/identifier';
import {PromenadesPage} from '../pages/promenades/promenades';
import {PromenadesCartePage} from '../pages/promenades/promenadesCarte/promenadesCarte';
import {PromenadesListePage} from '../pages/promenades/promenadesListe/promenadesListe';
import {AidePage} from '../pages/aide/aide';
import {FichesInfoPage} from '../pages/fichesInfo/fichesInfo';
import {SaisieObservationPage} from '../pages/saisieObservation/saisieObservation';
import {PopoverIdentifier} from '../pages/identifier/popoverIdentifier';
import {PopoverPromenades} from '../pages/promenades/popoverPromenades';
import {FicheLibellulePage} from '../pages/ficheLibellule/ficheLibellule';
import {FicheLibelluleOngletAccueilPage} from '../pages/ficheLibellule/ficheLibelluleOnglets/ficheLibelluleOngletAccueil/ficheLibelluleOngletAccueil';
import {FicheLibelluleOngletPhotosPage} from '../pages/ficheLibellule/ficheLibelluleOnglets/ficheLibelluleOngletPhotos/ficheLibelluleOngletPhotos';
import {FicheLibelluleOngletInfosPage} from '../pages/ficheLibellule/ficheLibelluleOnglets/ficheLibelluleOngletInfos/ficheLibelluleOngletInfos';
import {FicheLibelluleOngletDistributionPage} from '../pages/ficheLibellule/ficheLibelluleOnglets/ficheLibelluleOngletDistribution/ficheLibelluleOngletDistribution';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutrePage,
    IdentifierPage,
    PromenadesPage,
    PromenadesCartePage,
    PromenadesListePage,
    AidePage,
    FichesInfoPage,
    SaisieObservationPage,
    PopoverIdentifier,
    PopoverPromenades,
    FicheLibellulePage,
    FicheLibelluleOngletAccueilPage,
    FicheLibelluleOngletPhotosPage,
    FicheLibelluleOngletInfosPage,
    FicheLibelluleOngletDistributionPage
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
    PromenadesCartePage,
    PromenadesListePage,
    AidePage,
    FichesInfoPage,
    SaisieObservationPage,
    PopoverIdentifier,
    PopoverPromenades,
    FicheLibellulePage,
    FicheLibelluleOngletAccueilPage,
    FicheLibelluleOngletPhotosPage,
    FicheLibelluleOngletInfosPage,
    FicheLibelluleOngletDistributionPage
  ],
  providers: [
    GlobalService,
    JsonDataService
  ]
})
export class AppModule {}
