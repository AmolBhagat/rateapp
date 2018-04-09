import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RateApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirstPage } from '../pages/first/first';
import { PopoverComponent } from '../components/popover/popover';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ChartsModule } from 'ng2-charts';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from './service/service-api';
import { CommonModule } from '@angular/common';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    RateApp,
    HomePage,
    FirstPage,
    PopoverComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(RateApp),
    EmojiPickerModule.forRoot(),
    Ionic2RatingModule,
    ChartsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RateApp,
    HomePage,
    FirstPage,
    PopoverComponent,



  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,

    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    
    FileTransfer,
    FileTransferObject,
    File,
    Camera

  ],
  schemas: [

    NO_ERRORS_SCHEMA
  ]

})
export class AppModule { }
