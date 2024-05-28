import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { Rental, Vehicle, VehicleCode } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // APIS URLS
  private apiCarsUrl: string = 'assets/apis/carsData.json';
  private apiRentalsUrl: string = 'assets/apis/rentalData.json'

  constructor( private http: HttpClient ) { }


  // Modificación y unión de las apis vehículos y alquileres
  // Observable que combina las apis de vehiculos y Alquiles para retornar un observable con los datos del vehiculo seleccionado por código  y los datos de su alquiler
  getVehicleAndRentals( code:VehicleCode ):Observable<any>{

    return forkJoin({
      vehiclesArray: this.getVehicles(),
      rentalArray: this.getRentals()
    }).pipe(
      map( ({ vehiclesArray, rentalArray }) => {
        // Recoge los datos del vehiculo seleccionado
        const vehicleSelected = vehiclesArray.find( v => v.vehicleCode === code );
        const rentalsByVehicleCode = rentalArray.filter( r => r.vehicleCode === code);
        return { vehicleData: vehicleSelected, rentals: rentalsByVehicleCode };
      })
    )
  }


  // Observable con array de los alquileres
  getRentals(): Observable< Rental []>{
    return this.http.get< Rental[] >(this.apiRentalsUrl)
  }

  // Observable con array de vehiculos
  getVehicles(): Observable< Vehicle []>{
    return this.http.get< Vehicle[] >(this.apiCarsUrl)
  }


}
