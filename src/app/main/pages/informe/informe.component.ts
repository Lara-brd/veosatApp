import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Rental, Vehicle, VehicleCode } from '../../interfaces/data.interface';
import { VehicleWidthRentals } from '../../interfaces/vehicleAndRentals';




@Component({
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.scss'
})
export class InformeComponent implements OnInit {

  vehicleData: Vehicle  | null = null;

  rentalArr: Rental [] = [];

  constructor( private dataSvc:DataService ){}

  ngOnInit(): void {
    this.initChargeApiInformation();
    console.log('vehicledata', this.vehicleData)
  }

  // Método para actualizar información
  onLoadData():void{
    this.initChargeApiInformation();
    console.log('cargando', this.rentalArr)
  }

  // Metodo para cargar información de API
  initChargeApiInformation(){
    this.dataSvc.getVehicleAndRentals( VehicleCode.Jp ).subscribe( (data: VehicleWidthRentals) => {
      data.rentals.map( (el) => {

        // Establezco la imformación del vehiculo
        this.vehicleData = data.vehicleData;

        // conversión de las fechas de string a objeto Date()
        el.rentalStartDate = new Date( el.rentalStartDate);
        el.rentalEndDate = new Date(el.rentalEndDate)
      })
      this.rentalArr = data.rentals;
    })
  }




}
