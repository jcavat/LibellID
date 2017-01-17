import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {AutrePage} from '../pages/autres/autres'
import {IdentifierPage} from '../pages/identifier/identifier';
import {PromenadesPage} from '../pages/promenades/promenades';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutrePage,
    IdentifierPage,
    PromenadesPage
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
    PromenadesPage
  ],
  providers: []
})
export class AppModule {}
