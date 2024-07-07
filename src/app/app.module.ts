import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

//  import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule, 
    provideFirebaseApp(() => initializeApp({"projectId":"food-picker-48481","appId":"1:496630000300:web:1c5344ddab15f78050cd09","databaseURL":"https://food-picker-48481-default-rtdb.firebaseio.com","storageBucket":"food-picker-48481.appspot.com","apiKey":"AIzaSyDr7nc-EqzYyRwJdr2Vr7DJK7dHEeagpdI","authDomain":"food-picker-48481.firebaseapp.com","messagingSenderId":"496630000300","measurementId":"G-BP105SZVJN"})), 
    provideAuth(() => getAuth()), 
    provideDatabase(() => getDatabase()),
    provideFirestore(() =>getFirestore())
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}



