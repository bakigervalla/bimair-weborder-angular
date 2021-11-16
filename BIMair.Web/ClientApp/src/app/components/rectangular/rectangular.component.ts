import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-rectangular',
  templateUrl: './rectangular.component.html',
  styleUrls: ['./rectangular.component.scss']
})
export class RectangularComponent implements OnInit {

   fieldArray: Array<any> = [];
   newAttribute: any = {};
  colB: any;

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

  data = [
    { descrizione:'My Test', indice:'25', nota: [{test:'cod1'}, {test:'cod2'}] },
    { descrizione:'Best test', indice:'2', nota:[{test:'cod3'}, {test:'cod1'}] },
    { descrizione:'LTest', indice:'9', nota:[{test:'cod1'}, {test:'cod2'}] }
];

note = [
  {label:'RH Recht kanaal', value: 'RHBocht'},
  {label:'RH T-Stuk', value: 'cod2'},
  {label:'RH Bocht', value: 'cod3'},
  {label:'RH Verloop', value: 'cod3'},
  {label:'RH Sprong', value: 'cod3'},
  {label:'RH Aftakking', value: 'cod3'},
  {label:'RH Vierkant-Rond', value: 'cod3'},
  {label:'RH-S Bocht 2x', value: 'cod3'},
  {label:'RH-S Bocht en Verloop', value: 'cod3'},
  {label:'RH-S Bocht + Vierkant-rond', value: 'cod3'},
  {label:'RH Deksel', value: 'cod3'},
  {label:'RH Afgesch. Kanaal', value: 'cod3'},
  {label:'RH Plenum', value: 'cod3'},
  {label:'RH VP Raam', value: 'cod3'},
  {label:'RH Vlakke Plaat', value: 'cod3'},
  {label:'RH Flexibel', value: 'cod3'}
];

verbindingen	= [
  {label: 'TDC25'},
  {label: 'TDC35'},
  {label: 'P25'},
  {label: 'P35'},
  {label: 'P25 Los'},
  {label: 'P35 Los'},
  {label: 'P20'},
  {label: 'P30'},
  {label: 'P20 Los'},
  {label: 'P30 Los'}
];



selected = [];

@ViewChild('table') table: DatatableComponent;
rows = [];
public isEditable = {};

constructor() {}

ngOnInit() {
  this.rows = this.data;
  this.rows.forEach(row =>
    {
      let testArr = [];
      row.nota.forEach(nota => {testArr.push(nota.test)});
      row.selected = testArr;
    }
  )
  console.log(this.rows)




}
// Open/close panel
toggleExpandRow(row, expanded) {
  this.table.rowDetail.toggleExpandRow(row);
  if(!expanded){
    this.table.rowDetail.collapseAllRows();
    this.table.rowDetail.toggleExpandRow(row);
  }
  else if (expanded){
    this.table.rowDetail.collapseAllRows();
  }
}

// Save row
save(row, rowIndex){
  this.isEditable[rowIndex]=!this.isEditable[rowIndex]
  console.log("Row saved: "+ rowIndex);
}
colValue(field) {
  if(field =='RH Recht kanaal'  || field == 'RH Sprong'
  || field == 'RH Aftakking' || field == 'RH Vierkant-Rond'
  || field == 'RH-S Bocht 2x' || field == 'RH-S Bocht en verloop'
  || field == 'RH-S Bocht + vierkant-rond' || field == 'RH Deksel'
  || field == 'RH Afgesch. Kanaal' || field == 'RH Plenum'
  || field == 'RH VP Raam' || field == 'RH Vlakke Plaat' || field == 'RH Flexibel')
  {

    console.log(this.fieldArray);
  }
}
savebtn(data) {
  console.log(data);
}

// Delete row
delete(row, rowIndex){
  this.isEditable[rowIndex]=!this.isEditable[rowIndex]
  console.log("Row deleted: "+ rowIndex);
}
}
