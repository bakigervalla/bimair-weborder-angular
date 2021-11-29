import { Component, ViewChild, HostListener, ElementRef } from "@angular/core";
import { AlertService, MessageSeverity } from '../../services/alert.service';
import * as jexcel from "jexcel";

// import 'jexcel/dist/jexcel.css';
//  require("jexcel/dist/jexcel.css")
//  require("/node_modules/jexcel/dist/jexcel.css");

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: [
    './order-items.component.scss'
  ]
})
export class OrderItemsComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  data = [];
  // data = [
  //   ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
  //   ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
  // ];

  public excel;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    let contextMenu = document.querySelector('.jcontextmenu') as HTMLElement;
    console.log(contextMenu);
    if (contextMenu)
      contextMenu.style.left = '-400px';
  }

  ngAfterViewInit() {
    // debugger;
    this.excel = jexcel(this.spreadsheet.nativeElement, {
      data: this.data,
      // minDimensions: [40, 10],
      // freezeColumns: 2,
      // tableOverflow: true,
      // tableWidth: "600px",
      style: {
        A1: 'text-align:left;',
        B1: 'text-align: left;',
        C1: 'text-align:left;',
        D1: 'text-align: left;',
        E1: 'text-align:left;',
        F1: 'text-align: left;',
        G1: 'text-align:left;',
        H1: 'text-align: left;',
        I1: 'text-align:left;',
        J1: 'text-align: left;',
        K1: 'text-align:left;',
        L1: 'text-align: left;',
        M1: 'text-align:left;',
        N1: 'text-align: left;',
        O1: 'text-align:left;',
        P1: 'text-align: left;',
        Q1: 'text-align: left;',
        R1: 'text-align:right;',
        S1: 'text-align: right;',
        T1: 'text-align:right;',
        U1: 'text-align: left;',
        V1: 'text-align: left;',
        W1: 'text-align:left;',
        X1: 'text-align: left;',
        Y1: 'text-align:left;',
      },
      columns: [
        { type: 'dropdown', title: 'Code', width: 100, source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] },
        { type: 'dropdown', title: 'Number', width: 100, source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] },
        { type: 'text', title: 'A', width: 100 },
        { type: 'text', title: 'B', width: 100 },
        { type: 'text', title: 'C', width: 100 },
        { type: 'text', title: 'D', width: 100 },
        { type: 'text', title: 'E', width: 100 },
        { type: 'text', title: 'F', width: 100 },
        { type: 'text', title: 'G1', width: 80 },
        { type: 'text', title: 'G2', width: 80 },
        { type: 'text', title: 'H1', width: 80 },
        { type: 'text', title: 'H2', width: 80 },
        { type: 'text', title: 'I1', width: 80 },
        { type: 'text', title: 'I2', width: 110 },
        { type: 'text', title: 'K1', width: 100 },
        { type: 'text', title: 'K2', width: 100 },
        { type: 'numeric', title: 'L1', width: 60, mask: '$ #,##.00', decimal: '.' },
        { type: 'numeric', title: 'L2', width: 60, mask: '$ #,##.00', decimal: '.' },
        { type: 'numeric', title: 'L3', width: 60, mask: '$ #,##.00', decimal: '.' },
        { type: 'text', title: 'L4', width: 60 },
        { type: 'dropdown', title: 'Connection1', width: 60, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection2', width: 60, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection3', width: 60, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'numeric', title: 'Length', width: 80, mask: '$ #,##.00', decimal: '.' },
      ],
      minDimensions: [10, 10],
      onselection: function (html, colNumber, rowNumber) {
        // console.log(this.currentRowNumber)
      }
    });
  }

  // insertNewRow() {
  //   this.excel.insertRow(1, this.excel.length, false);
  // }

  // deleteRow() {
  //   console.log(this.currentRowNumber);
  //   if (this.currentRowNumber == -1)
  //     this.alertService.showMessage("Delete", "Click a row to select", MessageSeverity.error);
  //   else
  //     this.excel.deleteRow(this.currentRowNumber ? undefined : 1);

  // }

}
