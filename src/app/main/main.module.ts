import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = environment.MAPBOX_KEY;

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { InformeComponent } from './pages/informe/informe.component';
import { HelloPageComponent } from './pages/hello-page/hello-page.component';
import { ChartComponent } from './components/chart/chart.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TableComponent } from './components/table/table.component';
import { MapVehiclesComponent } from './components/map-vehicles/map-vehicles.component';
import { environment } from '../../environments/environment.development';
import { VehiclesSidebarComponent } from './components/vehicles-sidebar/vehicles-sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoaderComponent } from './components/svgs/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    InformeComponent,
    HelloPageComponent,
    ChartComponent,
    TableComponent,
    MapVehiclesComponent,
    VehiclesSidebarComponent,
    ToolbarComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
