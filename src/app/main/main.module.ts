import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { InformeComponent } from './pages/informe/informe.component';
import { HelloPageComponent } from './pages/hello-page/hello-page.component';
import { ChartComponent } from './components/chart/chart.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [


    HomeComponent,
         InformeComponent,
         HelloPageComponent,
         ChartComponent,
         TableComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimeNgModule
  ]
})
export class MainModule { }
