import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    ChartModule,
    InputTextModule,
    DividerModule,
    PasswordModule,
    RippleModule,
    TableModule,
    ToastModule
  ],
  exports:[
    ButtonModule,
    ChartModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    TableModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
