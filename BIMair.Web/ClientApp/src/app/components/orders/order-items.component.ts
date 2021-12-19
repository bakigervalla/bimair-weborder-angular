import { Component, ViewChild, HostListener, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { ProjectService } from '../../services/project.service';
import * as jexcel from "jexcel";
import { setUncaughtExceptionCaptureCallback } from "process";
import { JsonPipe } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "src/app/models/product.model";
import ProductsJson from '../../assets/data/products.json';

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
  activeTab = 'rectangular';
  isSaving = false;
  submitted = false;
  savedSuccessfully = false;
  products: Product[] = ProductsJson;
  product: any = {};

  // Lookups
  lookupBreedte = ["RH Recht kanaal", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"];
  lookupBreedteOnder = ["RH T-Stuk", "RH Bocht", "RH Verloop"];

  @ViewChild("spreadsheet") spreadsheet: any;
  @ViewChild("sheetround") sheetround: any;
  @ViewChild("sheetmontagerail") sheetmontagerail: any;
  @ViewChild("sheettotaalblad") sheettotaalblad: any;
  projectId: number;
  data: [];
  dataRound = [];
  dataMontagerail = [];
  dataTotaalblad = [];

  // data = [
  //   ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
  //   ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
  // ];

  public rectangularSheet;
  public roundSheet;
  public montagerailSheet;
  public totaalbladSheet;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private projectService: ProjectService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];

    if (this.projectId > 0)
      this.projectService.getOrderItemsByProjectId(this.projectId)
        .subscribe(data => {

          this.data = data.filter(x => x.productType == 'Rectangular');
          this.rectangularSheet.setData(this.data);

          this.dataRound = data.filter(x => x.productType == 'Round');
          this.roundSheet.setData(this.dataRound);

          this.dataMontagerail = data.filter(x => x.productType == 'Montagerail');
          this.montagerailSheet.setData(this.dataMontagerail);

          this.dataTotaalblad = data.filter(x => x.productType == 'Totaalblad');
          this.totaalbladSheet.setData(this.dataTotaalblad);
        });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    let contextMenu = document.querySelector('.jcontextmenu') as HTMLElement;
    if (contextMenu)
      contextMenu.style.left = '-400px';
  }

  ngAfterViewInit() {
    let self = this;
    // Rectangular
    this.rectangularSheet = jexcel(this.spreadsheet.nativeElement, {
      data: this.data,
      minDimensions: [24, 10],
      // freezeColumns: 2,
      //colHeaders: [ 'Product', 'Quantity', 'Price', 'Total' ],
      // colWidths: [ 300, 100, 100, 100 ],
      allowInsertColumn: false,
      csvFileName: 'BIMair-order-items',
      csvHeaders: true,
      csvDelimiter: ',',
      includeHeadersOnDownload: true,
      parseFormulas: true,
      tableOverflow: true,
      tableWidth: "1200px",
      style: {
        A1: 'text-align:center;',
        B1: 'text-align:left;',
        C1: 'text-align: center;',
        D1: 'text-align:left;',
        E1: 'text-align: left;',
        F1: 'text-align:left;',
        G1: 'text-align: left;',
        H1: 'text-align:left;',
        I1: 'text-align: left;',
        J1: 'text-align:left;',
        K1: 'text-align: left;',
        L1: 'text-align:left;',
        M1: 'text-align: left;',
        N1: 'text-align:left;',
        O1: 'text-align: left;',
        P1: 'text-align:left;',
        Q1: 'text-align: left;',
        R1: 'text-align: left;',
        S1: 'text-align:center;',
        T1: 'text-align: center;',
        U1: 'text-align:center;',
        V1: 'text-align: left;',
        W1: 'text-align: left;',
        X1: 'text-align:left;',
        Y1: 'text-align: left;',
        Z1: 'text-align:left;',
      },
      columns: [
        { type: 'numeric', title: 'Pos', name: "position", width: 80 },
        { type: 'dropdown', title: 'Code', name: "code", width: 100, source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] },
        { type: 'numeric', title: 'Aantal', name: "number", width: 100, /* source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] */ },
        { type: 'text', title: 'A', name: "a", width: 100 },
        { type: 'text', title: 'B', name: "b", width: 100 },
        { type: 'text', title: 'C', name: "c", width: 100 },
        { type: 'text', title: 'D', name: "d", width: 100 },
        { type: 'text', title: 'E', name: "e", width: 100 },
        { type: 'text', title: 'F', name: "f", width: 100 },
        { type: 'text', title: 'G1', name: "g1", width: 80 },
        { type: 'text', title: 'G2', name: "g2", width: 80 },
        { type: 'text', title: 'H1', name: "h1", width: 80 },
        { type: 'text', title: 'H2', name: "h2", width: 80 },
        { type: 'text', title: 'I1', name: "i1", width: 80 },
        { type: 'text', title: 'I2', name: "i2", width: 110 },
        { type: 'text', title: 'K1', name: "k1", width: 100 },
        { type: 'text', title: 'K2', name: "k2", width: 100 },
        { type: 'numeric', title: 'L1', name: "l1", width: 100 },
        { type: 'numeric', title: 'L2', name: "l2", width: 60 },
        { type: 'numeric', title: 'L3', name: "l3", width: 60 },
        { type: 'text', title: 'L4', name: "l4", width: 60 },
        { type: 'dropdown', title: 'Connection 1', name: "connection1", width: 70, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 2', name: "connection2", width: 70, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 3', name: "connection3", width: 70, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'text', title: 'Opmerkingen', name: "note", width: 100 },
        { type: 'hidden', name: "id" },
      ],
      // onselection: function (html, colNumber, rowNumber) {
      //   // console.log(this.currentRowNumber)
      // },

      oneditionend(instance, cell, x, y, value, save) {

        if (x == 0) { // Pos
          // C (Aantal)
          instance.jexcel.setValue(`C${y + 1}`, value > 0 && value != '' ? 1 : '');
        }
        else if (x == 1) { // Code
          self.product = self.products.filter(x => x.name == value)[0];

          // D
          if (value == '')
            instance.jexcel.setValue(`D${y + 1}`, '');
          else if (self.lookupBreedte.indexOf(value) >= 0)
            instance.jexcel.setValue(`D${y + 1}`, 'Breedte');
          else if (self.lookupBreedteOnder.indexOf(value) >= 0)
            instance.jexcel.setValue(`D${y + 1}`, 'Breedte Onder');

          self.setCellValuesByCode(instance, value, y);

          let con1 = instance.jexcel.getValue(`V${y + 1}`),
            con2 = instance.jexcel.getValue(`W${y + 1}`),
            con3 = instance.jexcel.getValue(`X${y + 1}`);

          self.setCellValuesByCodeAndConnection(instance, value, con1, con2, con3, y);
        }
        else if (x == 21) { // Connection 1
          let code = instance.jexcel.getValue(`B${y + 1}`),
            con2 = instance.jexcel.getValue(`W${y + 1}`),
            con3 = instance.jexcel.getValue(`X${y + 1}`);
          self.setCellValuesByCodeAndConnection(instance, code, value, con2, con3, y);
        }
        else if (x == 22) { // Connection 2
          let code = instance.jexcel.getValue(`B${y + 1}`),
            con1 = instance.jexcel.getValue(`V${y + 1}`),
            con3 = instance.jexcel.getValue(`X${y + 1}`);
          self.setCellValuesByCodeAndConnection(instance, code, con1, value, con3, y);
        }
        else if (x == 23) { // Connection 2
          let code = instance.jexcel.getValue(`B${y + 1}`),
            con1 = instance.jexcel.getValue(`V${y + 1}`),
            con2 = instance.jexcel.getValue(`W${y + 1}`);
          self.setCellValuesByCodeAndConnection(instance, code, con1, con2, value, y);
        }
      },
      updateTable: function (instance, cell, col, row, source, value, id) {
        // if (col == 1) {
        //   cell.classList.add('readonly');
        // }
        // Number formating
        // if (col == 2) {
        //   let _pos = instance.jexcel.getValue(`A${row}`);
        //   // instance.jexcel.setValue(`C${row}`, 'xxx' + x);
        // cell.style.backgroundColor = '#edf3ff';
        // }
      },
      onselection(instance, x1, y1) {
        if (x1 == 1) {
          let val = instance.jexcel.getValueFromCoords(x1, y1);
          self.product = self.products.filter(x => x.name == val)[0];
        }
      }
    });

    // Round
    this.roundSheet = jexcel(this.sheetround.nativeElement, {
      data: this.dataRound,
      minDimensions: [4, 10],
      allowInsertColumn: false,
      csvFileName: 'BIMair-order-items-round',
      csvHeaders: true,
      csvDelimiter: ',',
      includeHeadersOnDownload: true,
      parseFormulas: true,
      tableOverflow: true,
      style: {
        A1: 'text-align:left;',
        B1: 'text-align: center;',
        C1: 'text-align:center;',
        D1: 'text-align: center;'
      },
      columns: [
        { type: 'dropdown', title: 'Code', name: "code", width: 120, source: ["Spirobuis lengte 3m.", "B45", "B90", "Spirobocht 45gr", "Spirobocht 90gr", "Verbinding buis", "Verbinding hulpstuk", "Verloop sym", "Verloop A-sym", "Zadel 90gr", "Zadel 45gr", "Deksel t.b.v. buis", "Platte tuit 90gr", "Platte tuit 45gr", "Regelklep", "T-stuk"] },
        { type: 'numeric', title: 'Aantal', name: "number", width: 120 },
        { type: 'dropdown', title: 'Diameter 1', name: "diameter1", width: 80, source: ["100", "125", "160", "200", "250", "315", "355", "400", "450", "500", "560", "630", "710", "800", "900", "1000", "1120", "1250"] },
        { type: 'dropdown', title: 'Diameter 2', name: "diameter2", width: 80, source: ["100", "125", "160", "200", "250", "315", "355", "400", "450", "500", "560", "630", "710", "800", "900", "1000", "1120", "1250"] },
        { type: 'hidden', name: "id" },
      ],
      oneditionend(instance, cell, x, y, value, save) {
        if (x == 0) { // Code
          self.product = self.products.filter(x => x.name == value)[0];
        }
      },
      onselection(instance, x1, y1) {
        if (x1 == 0) {
          let val = instance.jexcel.getValueFromCoords(x1, y1);
          self.product = self.products.filter(x => x.name == val)[0];
        }
      }
    });

    // Montagerail
    this.montagerailSheet = jexcel(this.sheetmontagerail.nativeElement, {
      data: this.dataMontagerail,
      minDimensions: [3, 10],
      allowInsertColumn: false,
      csvFileName: 'BIMair-order-items-montagerail',
      csvHeaders: true,
      csvDelimiter: ',',
      includeHeadersOnDownload: true,
      parseFormulas: true,
      tableOverflow: true,
      style: {
        A1: 'text-align:left;',
        B1: 'text-align: center;',
        D1: 'text-align: center;'
      },
      columns: [
        { type: 'hidden', name: "id" },
        {
          type: 'dropdown', title: 'Code', name: "code", width: 120, source: ["Montagerail 30x15mm.", "Montagerail 30x20mm.", "Montagerail 30x43mm.", "Beugel met rubber (per stuk)",
            "Balkklem_M8 (200 stuks)", "Bevestigingsanker M8 (100 stuks)", "Boorschroef 42_13 (500 stuks)", "Boorschroef 42_19 (500 stuks)", "Boorschroef 63_19 (500 stuks)",
            "Carrosseriering M8x30 (200 stuks)", "Draadeind M8_2000 (per stuk)", "Expressanker M8x15 (100 stuks)", "Flensmoer M8ZB (200 stuks)", "Inslaganker M8x30 (100 stuks)",
            "Kabelband 7,5 x 540mm (per stuk)", "Siliconenkit Neutraal (1 tube)", "Koppelmoer M8x25 (100 stuks)", "Kozijnplug 5x50 (200 stuks)", "Luchtbev. hoek M8 (100 stuks)",
            "Messingplug M8x30 (100 stuks)", "Montageband kunststof", "Montagetape 50mm. 15m.", "Plafondanker", "Profielklem", "Slangenklem 60_135", "Slangenklem 60_165",
            "Slangenklem 60_215", "Slangenklem 60_270", "Slangenklem 60_325", "Slangklemband", "Slangklembandsluiting", "Slotbout M8x25", "Slotbout M8x30",
            "Snelanker M6x35", "Snelhanger 15-150", "Tapbout M8x25", "TDC Clip", "Tochtband", "Tuimelplug M8", "Zeskantmoer M8"]
        },
        { type: 'numeric', title: 'Aantal', name: "number", width: 120 },
        { type: 'numeric', title: 'Length', name: "length", width: 80 },
        { type: 'hidden', name: "id" },
      ],
      oneditionend(instance, cell, x, y, value, save) {
        if (x == 0) { // Code
          self.product = self.products.filter(x => x.name == value)[0];
        }
      },
      onselection(instance, x1, y1) {
        if (x1 == 0) {
          let val = instance.jexcel.getValueFromCoords(x1, y1);
          self.product = self.products.filter(x => x.name == val)[0];
        }
      }
    });

    // Totaalblad
    this.totaalbladSheet = jexcel(this.sheettotaalblad.nativeElement, {
      data: this.dataTotaalblad,
      minDimensions: [25, 10],
      allowInsertColumn: false,
      csvFileName: 'BIMair-order-items-round',
      csvHeaders: true,
      csvDelimiter: ',',
      includeHeadersOnDownload: true,
      parseFormulas: true,
      tableOverflow: true,
      tableWidth: "1200px",
      style: {
        A1: 'text-align:center;',
        B1: 'text-align: left;',
        C1: 'text-align:center;',
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
        R1: 'text-align:center;',
        S1: 'text-align: center;',
        T1: 'text-align:center;',
        U1: 'text-align: left;',
        V1: 'text-align: left;',
        W1: 'text-align:left;',
        X1: 'text-align: left;',
        Y1: 'text-align:left;',
      },
      columns: [
        { type: 'numeric', title: 'Pos', name: "position", width: 100, readOnly:true },
        { type: 'text', title: 'Code', name: "code", width: 100, readOnly:true },
        { type: 'numeric', title: 'Aantal', name: "number", width: 100, readOnly:true },
        { type: 'text', title: 'A', name: "a", width: 100, readOnly:true },
        { type: 'text', title: 'B', name: "b", width: 100, readOnly:true },
        { type: 'text', title: 'C', name: "c", width: 100, readOnly:true },
        { type: 'text', title: 'D', name: "d", width: 100, readOnly:true },
        { type: 'text', title: 'E', name: "e", width: 100, readOnly:true },
        { type: 'text', title: 'F', name: "f", width: 100, readOnly:true },
        { type: 'text', title: 'G1', name: "g1", width: 80, readOnly:true },
        { type: 'text', title: 'G2', name: "g2", width: 80, readOnly:true},
        { type: 'text', title: 'H1', name: "h1", width: 80, readOnly:true },
        { type: 'text', title: 'H2', name: "h2", width: 80, readOnly:true },
        { type: 'text', title: 'I1', name: "i1", width: 80, readOnly:true },
        { type: 'text', title: 'I2', name: "i2", width: 110, readOnly:true },
        { type: 'text', title: 'K1', name: "k1", width: 100, readOnly:true },
        { type: 'text', title: 'K2', name: "k2", width: 100, readOnly:true },
        { type: 'numeric', title: 'L1', name: "l1", width: 60, readOnly:true },
        { type: 'numeric', title: 'L2', name: "l2", width: 60, readOnly:true },
        { type: 'numeric', title: 'L3', name: "l3", width: 60, readOnly:true },
        { type: 'text', title: 'L4', name: "l4", width: 60, readOnly:true },
        { type: 'text', title: 'Connection 1', name: "connection1", width: 70, readOnly:true },
        { type: 'text', title: 'Connection 2', name: "connection2", width: 70, readOnly:true },
        { type: 'text', title: 'Connection 3', name: "connection3", width: 70, readOnly:true },
        { type: 'text', title: 'Remarks', name: "note", width: 100, readOnly:true },
        { type: 'hidden', name: "id" },
      ],
      oneditionend(instance, cell, x, y, value, save) {
        if (x == 1) { // Code
          self.product = self.products.filter(x => x.name == value)[0];
        }
      },
      onselection(instance, x1, y1) {
        if (x1 == 1) {
          let val = instance.jexcel.getValueFromCoords(x1, y1);
          self.product = self.products.filter(x => x.name == val)[0];
        }
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

  setCellValuesByCode = (instance, value, y) => {

    // Set E
    if (value == '')
      instance.jexcel.setValue(`E${y + 1}`, '');
    else if (["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`E${y + 1}`, 'Diepte');
    else if ("RH Verloop" == value)
      instance.jexcel.setValue(`E${y + 1}`, 'Diepte Onder');

    // SET F
    if (value == '')
      instance.jexcel.setValue(`F${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`F${y + 1}`, 'Breedte Links');
    else if (["RH Bocht", "RH Verloop"].indexOf(value) >= 0)
      instance.jexcel.setValue(`F${y + 1}`, 'Breedte Boven');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`F${y + 1}`, 'Breedte Linksonder');
    else if ("RH Afgesch. Kanaal" == value)
      instance.jexcel.setValue(`F${y + 1}`, 'Breedte schuine zijde');
    else if (["RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`F${y + 1}`, 'Breedte Bocht onder');
    else if (["RH Recht kanaal", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond",
      "RH Deksel", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`F${y + 1}`, '');

    // SET G
    if (value == '')
      instance.jexcel.setValue(`G${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`G${y + 1}`, 'Breedte Rechts');
    else if ("RH Verloop" == value)
      instance.jexcel.setValue(`G${y + 1}`, 'Diepte Boven');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`G${y + 1}`, 'Breedte Linksboven');
    else if (["RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`G${y + 1}`, 'Breedte Bocht Boven');
    else if (["RH Recht kanaal", "RH Bocht", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`G${y + 1}`, '');

    // SET H
    if (value == '')
      instance.jexcel.setValue(`H${y + 1}`, '');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`H${y + 1}`, 'Breedte Rechtsboven');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`H${y + 1}`, 'Verloop Breedte Boven');
    else if (["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`H${y + 1}`, '');

    // SET I
    if (value == '')
      instance.jexcel.setValue(`I${y + 1}`, '');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`I${y + 1}`, 'Verloop Diepte Boven');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`I${y + 1}`, '');

    // SET J
    if (value == '')
      instance.jexcel.setValue(`J${y + 1}`, '');
    else if (["RH Bocht", "RH Verloop", "RH-S Bocht en Verloop", "RH=S Bocht + Vierkant-rond", "RH Sprong", "RH Afgesch. Kanaal"].indexOf(value) >= 0)
      instance.jexcel.setValue(`J${y + 1}`, 'Graden');
    else if ("RH-S Bocht + Vierkant-rond" == value)
      instance.jexcel.setValue(`J${y + 1}`, 'Graden Bocht');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`J${y + 1}`, 'Graden Links');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal",
      "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`J${y + 1}`, '');

    // SET K
    if (value == '')
      instance.jexcel.setValue(`K${y + 1}`, '');
    else if ("RH-S Bocht + Vierkant-rond" == value)
      instance.jexcel.setValue(`K${y + 1}`, 'Graden Verloop');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`K${y + 1}`, 'Graden Rechts');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH-S Bocht en Verloop", "RH Aftakking", "RH Vierkant-Rond", "RH Deksel",
      "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`K${y + 1}`, '');

    // SET L
    if (value == '')
      instance.jexcel.setValue(`L${y + 1}`, '');
    else if ("RH Bocht" == value)
      instance.jexcel.setValue(`L${y + 1}`, 'Radius');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`L${y + 1}`, 'Radius Links');

    else if (["RH T-Stuk", "RH-S Bocht 2x"].indexOf(value) >= 0)
      instance.jexcel.setValue(`L${y + 1}`, 'Radius Links');
    else if (["RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`L${y + 1}`, 'Radius Bocht');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH Deksel",
      "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`L${y + 1}`, '');

    // SET M
    if (value == '')
      instance.jexcel.setValue(`M${y + 1}`, '');
    else if (["RH T-Stuk", "RH-S Bocht 2x"].indexOf(value) >= 0)
      instance.jexcel.setValue(`M${y + 1}`, 'Radius Rechts');
    else if (["RH-S Bocht + Vierkant-rond", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong",
      "RH Aftakking", "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`M${y + 1}`, '');

    // SET N
    if (value == '')
      instance.jexcel.setValue(`N${y + 1}`, '');
    else if (["RH T-Stuk", "RH Sprong"].indexOf(value) >= 0)
      instance.jexcel.setValue(`N${y + 1}`, 'Extensie Links');
    else if (["RH Aftakking", "RH Bocht", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`N${y + 1}`, 'Extensie Boven');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`N${y + 1}`, 'Extensie Onder');
    else if (["RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond",
      "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`N${y + 1}`, '');

    // SET O
    if (value == '')
      instance.jexcel.setValue(`O${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`O${y + 1}`, 'Extensie onder Links');
    else if (["RH Verloop", "RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`O${y + 1}`, 'Offset Breedte');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`O${y + 1}`, 'Extensie Onder');
    else if (["RH Bocht", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking",
      "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`O${y + 1}`, '');

    // SET P
    if (value == '')
      instance.jexcel.setValue(`P${y + 1}`, '');
    else if (["RH T-Stuk", "RH Sprong"].indexOf(value) >= 0)
      instance.jexcel.setValue(`P${y + 1}`, 'Extension Rechts');
    else if (["RH Bocht", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`P${y + 1}`, 'Extensie Onder');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`P${y + 1}`, 'Extensie Bocht');
    else if (["RH Bocht", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking",
      "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`P${y + 1}`, '');

    // SET Q
    if (value == '')
      instance.jexcel.setValue(`Q${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`Q${y + 1}`, 'Extension Onder Rechts');
    else if (["RH Verloop", "RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`Q${y + 1}`, 'Offset Diepte');
    else if (["RH Bocht", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking",
      "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`Q${y + 1}`, '');
  }

  setCellValuesByCodeAndConnection = (instance, code, con1, con2, con3, y) => {

    // Set R
    if (code == '')
      instance.jexcel.setValue(`R${y + 1}`, '');
    else if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
      instance.jexcel.setValue(`R${y + 1}`, 1410);
    else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
      instance.jexcel.setValue(`R${y + 1}`, 1456);
    else if (code == "R" && con1 != "W" && con2 != "W")
      instance.jexcel.setValue(`R${y + 1}`, 1500);
    else if (["S", "V", "P"].indexOf(code) >= 0)
      instance.jexcel.setValue(`R${y + 1}`, 0);
    else if (code == "J")
      instance.jexcel.setValue(`R${y + 1}`, 50);
    else if (code == "F")
      instance.jexcel.setValue(`R${y + 1}`, 330);
    else
      instance.jexcel.setValue(`R${y + 1}`, '');

    // SET S
    if (code == '')
      instance.jexcel.setValue(`S${y + 1}`, '');
    else if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
      instance.jexcel.setValue(`S${y + 1}`, 1160);
    else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
      instance.jexcel.setValue(`S${y + 1}`, 1456);
    else if (code == "R" && con1 != "W" && con2 != "W")
      instance.jexcel.setValue(`S${y + 1}`, 1500);
    else if (["S", "V", "P"].indexOf(code) >= 0)
      instance.jexcel.setValue(`S${y + 1}`, 0);
    else if (code == "J")
      instance.jexcel.setValue(`S${y + 1}`, 50);
    else if (code == "F")
      instance.jexcel.setValue(`S${y + 1}`, 330);
    else
      instance.jexcel.setValue(`S${y + 1}`, '');

    // SET T
    if (code == '')
      instance.jexcel.setValue(`T${y + 1}`, '');
    else if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
      instance.jexcel.setValue(`T${y + 1}`, 910);
    else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
      instance.jexcel.setValue(`T${y + 1}`, 1456);
    else if (code == "R" && con1 != "W" && con2 != "W")
      instance.jexcel.setValue(`T${y + 1}`, 1500);
    else if (["S", "V", "P"].indexOf(code) >= 0)
      instance.jexcel.setValue(`T${y + 1}`, 0);
    else if (code == "J")
      instance.jexcel.setValue(`T${y + 1}`, 50);
    else if (code == "F")
      instance.jexcel.setValue(`T${y + 1}`, 330);
    else
      instance.jexcel.setValue(`T${y + 1}`, '');


  }

  toggelTab(activeTab) {
    this.activeTab = activeTab;
  }

  download() {
    switch (this.activeTab) {
      case "rectangular":
        this.rectangularSheet.download();
        break;
      case "round":
        this.roundSheet.download();
        break;
      case "montagerail":
        this.montagerailSheet.download();
        break;
      case "totaalblad":
        this.totaalbladSheet.download();
        break;
    }
  }

  sendByEmail = () => {
    // TBD
    this.alertService.showMessage('Success', `Order sent successfully`, MessageSeverity.success);
  }

  save() {
    let prjId = this.projectId;
    var rectangularData = this.rectangularSheet.getJson();

    rectangularData.forEach(function (element) {
      element.ProductType = "Rectangular";
      element.ProjectId = prjId;
    });

    var roundData = this.roundSheet.getJson();
    roundData.forEach(function (element) {
      element.ProductType = "Round";
      element.ProjectId = prjId;
    });

    var montagerailData = this.montagerailSheet.getJson();
    montagerailData.forEach(function (element) {
      element.ProductType = "Montagerail";
      element.ProjectId = prjId;
    });

    var totaalbladData = this.totaalbladSheet.getJson();
    totaalbladData.forEach(function (element) {
      element.ProductType = "Totaalblad";
      element.ProjectId = prjId;
    });

    rectangularData = rectangularData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    roundData = roundData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    montagerailData = montagerailData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    totaalbladData = totaalbladData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);

    let jsonData = [...rectangularData, ...roundData, ...montagerailData, ...totaalbladData];

    console.log(jsonData);

    this.projectService.saveOrderItems(jsonData)
      .subscribe(x => this.saveSuccessHelper(), error => this.saveFailedHelper(error));

  }

  private saveSuccessHelper() {
    this.isSaving = false;
    this.savedSuccessfully = true;
    this.alertService.stopLoadingMessage();

    this.alertService.showMessage('Success', `Order items saved successfully`, MessageSeverity.success);
  }

  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occurred whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

}
