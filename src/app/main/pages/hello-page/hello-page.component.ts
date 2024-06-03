import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { VehicleCode } from '../../interfaces/data.interface';

@Component({
  templateUrl: './hello-page.component.html',
  styleUrl: './hello-page.component.scss'
})
export class HelloPageComponent implements OnInit{

  private hasLoaded:boolean = false;

  constructor( private dataSvc: DataService ){}

  ngOnInit(): void {


  }


}
