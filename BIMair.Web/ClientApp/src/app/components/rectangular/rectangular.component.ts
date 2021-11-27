import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Order } from '../../models/order.model';

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
ordList: Array<Order> = [];
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
colValue(id, field) {


    let colA, colB, colC, colD, colE, colF, colG1, colG2, colH1, colH2, colI1, ColI2, colK1, colK2,colL1, colL2, colL3, colL4, colverbindingen1, colverbindingen2, colverbindingen3;
// col A
    if(field =='RH Recht kanaal'  || field == 'RH Sprong'
    || field == 'RH Aftakking' || field == 'RH Vierkant-Rond'
    || field == 'RH-S Bocht 2x' || field == 'RH-S Bocht en verloop'
    || field == 'RH-S Bocht + vierkant-rond' || field == 'RH Deksel'
    || field == 'RH Afgesch. Kanaal' || field == 'RH Plenum'
    || field == 'RH VP Raam' || field == 'RH Vlakke Plaat' || field == 'RH Flexibel')
    { colA = 'Breedte'; }

    if(field =='RH T-Stuk'  || field == 'RH Bocht' || field == 'RH Verloop')
    { colA = 'Breedte Onder'; }
    // end colA

    // Column B
    if(field =='RH Recht kanaal' || field =='RH T-Stuk'
    || field == 'RH Bocht' || field == 'RH Sprong'
    || field == 'RH Aftakking' || field == 'RH Vierkant-Rond'
    || field == 'RH-S Bocht 2x' || field == 'RH-S Bocht en verloop'
    || field == 'RH-S Bocht + vierkant-rond' || field == 'RH Deksel'
    || field == 'RH Afgesch. Kanaal' || field == 'RH Plenum'
    || field == 'RH VP Raam' || field == 'RH Vlakke Plaat'
    || field == 'RH Flexibel') {
      colB = 'Diepte';
    }

    if(field == 'RH Verloop') { colB = 'Diepte Onder'; }
    // end B

    // col C
    if(field == 'RH T-Stuk')                              { colC = 'Breedte Links'; }
    else if(field == 'RH Bocht' || field == 'RH Verloop') { colC = 'Breedte Boven'; }
    else if (field == 'RH-S Bocht 2x')                    { colC = 'Breedte Linksonder'; }
    else if (field == 'RH Afgesch. Kanaal')               { colC = 'Breedte schuine zijde'; }
    else if (field == 'RH-S Bocht en Verloop' || field == 'RH-S Bocht + vierkant-rond') { colC = 'Breedte Bocht onder'; }
    // end C

    // Col D
    if(field == 'RH T-Stuk')        { colD =  'Breedte Rechts' }
    else if (field == 'RH Verloop') { colD = 'Diepte Boven'; }
    else if (field == 'RH-S Bocht 2x') { colD = 'Breedte Linksboven'; }
    else if (field == 'RH-S Bocht en Verloop' || field == 'RH-S Bocht + vierkant-rond') { colD = 'Breedte Bocht Boven'; }
    // End D

    // Col E
    if(field == 'RH-S Bocht 2x') { colE = 'Breedte Rechtsboven'; }
    else if (field == 'RH-S Bocht en Verloop') { colE = 'Verloop Breedte Boven'; }
    // End E

    // Col F
    if(field == 'RH-S Bocht en Verloop') { colF = 'Verloop Diepte Boven'; }
    // End F

    // Col G1
    if(field =='RH Bocht' || field == 'RH Verloop' || field == 'RH-S Bocht en Verloop' || field == 'RH=S Bocht + Vierkant-rond'
    || field == 'RH Sprong' || field == 'RH Afgesch. Kanaal') { colG1 = 'Graden'; }
    else if (field == 'RH-S Bocht + vierkant-rond') { colG1 = 'Graden Bocht'; }
    else if (field == 'RH-S Bocht 2x') { colG1 = 'Graden Links'; }
    // End G1

    // Col G2
    if(field == 'RH-S Bocht 2x') { colG2 = 'Graden Rechts'; }
    else if (field == 'RH-S Bocht + vierkant-rond') { colG2 = 'Graden Verloop'; }
    // End G2

    // Col H1
    if(field == 'RH Bocht') { colH1 = 'Radius'; }
    else if (field == 'RH T-stuk' || field == 'RH-S Bocht 2x') { colH1 = 'Radius Links'; }
    else if (field == 'RH-S Bocht en verloop' || field == 'RH-S Bocht + Vierkant-Rond') { colH1 = 'Radius Bocht'; }
    // End H1

    // Col H2
    if (field == 'RH T-stuk' || field == 'RH-S Bocht 2x') { colH2 = 'Radius Rechts'; }
    // End H2

    // Col I1
    if (field == 'RH-S Bocht en Verloop') { colI1 = 'Extensie Onder'; }
    else if (field == 'RH T-stuk' || field == 'RH Sprong') {colI1 = 'Extension Links'; }
    else if (field == 'RH Aftakking' || field == 'RH Bocht' || field == 'RH-S Bocht + vierkant-rond') { colI1 = 'Extensie Boven'; }
    // End I1

    // Col I2
    if (field == 'RH T-stuk') { ColI2 = 'Extension onder Links'; }
    else if (field == 'RH Verloop' || field == 'RH-S Bocht en verloop' || field == 'RH-S Bocht + vierkant-rond') { ColI2 = 'Offset Breedte'; }
    else if (field == 'RH-S Bocht en Verloop') { ColI2 = 'Extensie Onder'; }
    // End I2

    // Col K1
    if(field == 'RH T-stuk' || field == 'RH Sprong') { colK1 = 'Extension Rechts'; }
    else if (field == 'RH Bocht' || field == 'RH-S Bocht + vierkant-rond') { colK1 = 'Extensie Onder'; }
    else if (field == 'RH-S Bocht en Verloop') { colK1 = 'Extensie Bocht'; }
    // End K1

    // Col K2
    if(field == 'RH T-stuk') { colK2 = 'Extension Onder'; }
    else if (field == 'RH Verloop' || field == 'RH-S Bocht en verloop'  || field == 'RH-S Bocht + vierkant-rond') { colK2 = 'Offset Diepte'; }

    // End K2

    colL1 = null;
    colL2 = null;
    colL3 = null;
    colL4 = null;

    colverbindingen1 = null;
    colverbindingen2 = null;
    colverbindingen3 = null;


    this.fieldArray[id] = ({id: id, name: field, cA: colA, cB: colB,
                            cC: colC, cD: colD, cE: colE,  cF: colF,
                            cG1: colG1, cG2: colG2, cH1: colH1,
                            cH2: colH2, cI1: colI1, cI2: ColI2,
                            cK1: colK1, cK2: colK2, cL1: colL1,
                            cL2: colL2, cL3: colL3, cL4: colL4 });

}
savebtn(data) {
  console.log(this.fieldArray);
}

// Delete row
delete(row, rowIndex){
  this.isEditable[rowIndex]=!this.isEditable[rowIndex]
  console.log("Row deleted: "+ rowIndex);
}

// Get value By Select Value
getValueBySelectValue(field: any, column: any): any {
  if (field =='RH Recht kanaal'  || field == 'RH Sprong'
  || field == 'RH Aftakking' || field == 'RH Vierkant-Rond'
  || field == 'RH-S Bocht 2x' || field == 'RH-S Bocht en verloop'
  || field == 'RH-S Bocht + vierkant-rond' || field == 'RH Deksel'
  || field == 'RH Afgesch. Kanaal' || field == 'RH Plenum'
  || field == 'RH VP Raam' || field == 'RH Vlakke Plaat' || field == 'RH Flexibel')
  {
    console.log('getValue');
  }
}


}
