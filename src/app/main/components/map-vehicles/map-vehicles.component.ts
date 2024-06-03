import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../../interfaces/data.interface';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Map, LngLat, Marker } from 'mapbox-gl';



@Component({
  selector: 'app-map-vehicles',
  templateUrl: './map-vehicles.component.html',
  styleUrl: './map-vehicles.component.scss'
})
export class MapVehiclesComponent implements AfterViewInit{

  @ViewChild('map') divMap?:ElementRef;
  public map?: Map;
  public vehicles: Vehicle[] = [];
  currentCenter: LngLat  = new LngLat( -3.6887986147530913, 40.414283392854905); ; // Coordenadas de ejemplo

  public isLoading:boolean = true;

  constructor( private dataSvc:DataService ){ }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(){
    this.map = new Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter,
      zoom: 5, // starting zoom
    });

    this.mapListeners();

  }

  mapListeners(){
    // cuando carga el mapa ya puedo cargar la info de backend y crear los marcadores
    this.map?.on('load', () => {
      this.isLoading = false;
      this.getVehiclesMarkers();
    })

  }


  getVehiclesMarkers(){
    this.dataSvc.getVehicles().subscribe( data => {
      this.vehicles = data;

      this.vehicles.forEach( car => {
        const [ lng, lat ] = car.lastLocation;
        const loc = new LngLat(lng,lat);
        this.addMarker(loc, car.image || '')

      })
    })
  }

  // añadir markers introduciendo info del los vehiculos
  private addMarker( location:LngLat, img:string){
    if( !this.map ) throw 'El elemento html no fue encontrado';

    const el = document.createElement('div');
    el.innerHTML =  `<img src = ${img} class="marker-img" style="width: 70px; border-radius: 50%; image-rendering: crisp-edges;  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; border: 3px solid white">`;
    const marker = new Marker(el)
      .setLngLat( location )
      .addTo( this.map )
  }

  flyTo( location: [number, number]){
    this.map?.flyTo({
      zoom:14,
      center:location
    })
  }


}
