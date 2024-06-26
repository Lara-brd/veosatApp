import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import { Rental } from '../../interfaces/data.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit{

  // Recibiendo info del componente padre ( array de alquileres del coche )
  @Input() data: Rental[] = [];


  // Emitimos loading para que el componente informe refresque la información
  @Output() loading = new EventEmitter();

  @ViewChild('dt1') dt1?: Table;

  cols: any[] = [];
  exportColumns: any[] = [];
  formGroup: FormGroup =  this.fb.group({});

  constructor( private fb:FormBuilder, private dataSvc:DataService ){}

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      date: [null]
    })


    //Array de columnas necesario para crear el documento pdf
    this.cols = [
      { field: 'id', header: 'id', customExportHeader: 'Product Code' },
      { field: 'rentalStartDate', header: 'Start Date' },
      { field: 'startLocation', header: 'Start Location' },
      { field: 'rentalEndDate', header: 'End Date' },
      { field: 'endLocation', header: 'End Location' },
      { field: 'totalHours', header: 'Total' },
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

  }

  // Emitimos al componente padre para que actualice la información
  onLoad(){
    this.loading.emit();
  }


  // SEARCH METHODS
  clear(table: Table) {
    table.clear();
  }


  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.dt1) {
      this.dt1.filterGlobal(input.value, 'contains');
    }
  }

  onDateSelect(selectedDate:Date){

    const searchResult:any[] = [];

    this.data.forEach(rental => {
      rental.rentalStartDate = new Date(rental.rentalStartDate)

      if(
        (rental.rentalEndDate.getFullYear() === selectedDate.getFullYear()) &&
        (rental.rentalEndDate.getMonth() === selectedDate.getMonth()) &&
        (rental.rentalEndDate.getDate() === selectedDate.getDate())

      ){
        searchResult.push(rental)
      }else{
        console.log('no hay fechas')
      }

    });

    this.data = searchResult;
    this.dt1?.reset();


    // const selectedRental = this.data.filter(rental => {
    //   const rentalStartDate = new Date( rental.rentalStartDate);
    //   return rentalStartDate.getFullYear() === selectedDate.getFullYear() &&
    //     rentalStartDate.getMonth() === selectedDate.getMonth()
    // })

    // if (selectedRental) {
    //   console.log('Rental object:', selectedRental);
    //   // Aquí puedes hacer lo que quieras con el objeto seleccionado
    // } else {
    //   console.log('No rental found for selected date.');
    // }

  }



  // EXPORTACIÓN DE DOCUMENTOS //////////////////////////////


  // PDF
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.data);
            doc.save('products.pdf');
        });
    });
  }


// EXCEL
exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Data");
    });
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
