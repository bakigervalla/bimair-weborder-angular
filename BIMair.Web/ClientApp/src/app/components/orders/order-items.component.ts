import { Component, ViewChild, ElementRef } from "@angular/core";
import * as jexcel from "jexcel";

import 'jexcel/dist/jexcel.css';
// require("jexcel/dist/jexcel.css")
// require("/node_modules/jexcel/dist/jexcel.css");

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: [
    "../../../../node_modules/jexcel/dist/jexcel.css",
    './order-items.component.scss'
  ]
})
export class OrderItemsComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  data = [
      ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
      ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
  ];

  constructor() { console.log(jexcel);}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // debugger;
    jexcel(this.spreadsheet.nativeElement, {
      data:this.data,
      columns: [
          { type: 'text', title:'Car', width:120 },
          { type: 'dropdown', title:'Make', width:200, source:[ "Alfa Romeo", "Audi", "Bmw" ] },
          { type: 'calendar', title:'Available', width:200 },
          { type: 'image', title:'Photo', width:120 },
          { type: 'checkbox', title:'Stock', width:80 },
          { type: 'numeric', title:'Price', width:100, mask:'$ #.##,00', decimal:',' },
          { type: 'color', width:100, render:'square', }
      ],
      minDimensions: [10, 10]
  });
  }

}
