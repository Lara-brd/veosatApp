import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';


//Configuración del LOCALE de la app -> cargamos solo los idiomas que vamos a usar
import  localeEs  from '@angular/common/locales/es';
import  localeFrCA  from '@angular/common/locales/fr-CA';
import { registerLocaleData } from '@angular/common';
// Esto afecta a los pipes
registerLocaleData( localeEs );
registerLocaleData( localeFrCA );

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PrimeNgModule,
    HttpClientModule
  ],
  providers: [
    // InYección para decirle a angular que establezca un idioma x defecto en toda la aplicación
    {
      provide: LOCALE_ID, useValue:'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
