import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ɵsetInjectorProfilerContext } from '@angular/core';
import { Vehicle } from '../../interfaces/data.interface';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles-sidebar',
  templateUrl: './vehicles-sidebar.component.html',
  styleUrl: './vehicles-sidebar.component.scss'
})
export class VehiclesSidebarComponent implements OnInit{

  @Output() flyToVehicle = new EventEmitter<[ number, number]>()

  public vehiclesList?:Observable<Vehicle[]>;

  constructor( private dataSvc:DataService ){}

  ngOnInit(): void {
    this.vehiclesList = this.dataSvc.getVehicles();
  }

  flyTo( location:[ number, number] ){
    this.flyToVehicle.emit( location );
  }







}
