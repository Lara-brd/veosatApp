import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Rental, VehicleCode } from '../../interfaces/data.interface';
import { VehicleWidthRentals } from '../../interfaces/vehicleAndRentals';




@Component({
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.scss'
})
export class InformeComponent implements OnInit {

  rentalArr: Rental [] = [];

  constructor( private dataSvc:DataService ){}

  ngOnInit(): void {
    this.initChargeApiInformation();
  }

  onLoadData():void{
    this.initChargeApiInformation();
    console.log('cargando', this.rentalArr)

  }


  // Metodo para cargar información de API
  initChargeApiInformation(){
    this.dataSvc.getVehicleAndRentals( VehicleCode.Jp ).subscribe( (data: VehicleWidthRentals) => {
      data.rentals.map( (el) => {
        // TODO -> establecer el idioma local y pipe fechas en html
        // conversión de las fechas de string a objeto Date()
        el.rentalStartDate = new Date( el.rentalStartDate);
        el.rentalEndDate = new Date(el.rentalEndDate)
      })
      this.rentalArr = data.rentals;
    })
  }




}
