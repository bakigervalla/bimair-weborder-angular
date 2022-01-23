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
import { reduceEachTrailingCommentRange } from "typescript";
import { ThrowStmt } from "@angular/compiler";

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
  isConfirmOrderEnabled = false;
  isStatusEditable = true;
  savedSuccessfully = false;
  products: Product[] = ProductsJson;
  product: any = {};

  // Lookups
  lookupBreedte = ["RH Recht kanaal", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"];
  lookupBreedteOnder = ["RH T-Stuk", "RH Bocht", "RH Verloop"];

  @ViewChild("spreadsheet") spreadsheet: any;
  @ViewChild("sheetround") sheetround: any;
  @ViewChild("sheetmontagerail") sheetmontagerail: any;
  // Totaalblad
  @ViewChild("sheetDisplay") sheetDisplay: any;
  @ViewChild("sheetroundDisplay") sheetroundDisplay: any;
  @ViewChild("sheetmontagerailDisplay") sheetmontagerailDisplay: any;
  // @ViewChild("sheettotaalblad") sheettotaalblad: any;
  projectId: number;
  projectStatus: number;
  data = []; // ['001'], ['002'], ['003'], ['004'], ['005'], ['006'], ['007'], ['008'], ['009'], ['010']];
  dataRound = [];
  dataMontagerail = [];
  // dataTotaalblad = [];
  //
  dataRectangularDisplay = [];
  dataRoundDisplay = [];
  dataMontagerailDisplay = [];
  //
  public rectangularSheet;
  public roundSheet;
  public montagerailSheet;
  // Totaalblad
  public rectangularDisplay;
  public roundDisplay;
  public montagerailDisplay;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private projectService: ProjectService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.projectStatus = this.route.snapshot.params['status'];

    if (this.projectId > 0)

      this.projectService.getProject(this.projectId)
        .subscribe(data => {
          this.isStatusEditable = data?.status < 3; // Order Confirmed
          console.log(this.isStatusEditable)
          // enable/disable input by ProjectStatus
          this.rectangularSheet.options.editable = this.isStatusEditable;
          this.roundSheet.options.editable = this.isStatusEditable;
          this.montagerailSheet.options.editable = this.isStatusEditable;

          if (!this.isStatusEditable) {
            this.rectangularSheet.options.columns.forEach((el, indx) => {
              el.type = "readonly";
            });
            this.roundSheet.options.columns.forEach((el, indx) => {
              el.type = "readonly";
            })
            this.montagerailSheet.options.columns.forEach((el, indx) => {
              el.type = "readonly";
            })
          }
        });

    this.projectService.getOrderItemsByProjectId(this.projectId)
      .subscribe(data => {

        this.data = data.filter(x => x.productType == 'Rectangular');
        this.rectangularSheet.setData(this.data);

        this.dataRound = data.filter(x => x.productType == 'Round');
        this.roundSheet.setData(this.dataRound);

        this.dataMontagerail = data.filter(x => x.productType == 'Montagerail');
        this.montagerailSheet.setData(this.dataMontagerail);

        this.isConfirmOrderEnabled = true; //this.projectStatus == 1;
        // this.dataTotaalblad = data.filter(x => x.productType == 'Totaalblad');
        // this.totaalbladSheet.setData(this.dataTotaalblad);
      })
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    let contextMenu = document.querySelectorAll('.jcontextmenu');
    contextMenu.forEach(item => {
      (item as HTMLElement).style.left = '-400px';
    })
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
      editable: this.isStatusEditable,
      csvFileName: 'BIMair-order-items',
      csvHeaders: true,
      csvDelimiter: ',',
      includeHeadersOnDownload: true,
      parseFormulas: true,
      tableOverflow: true,
      tableWidth: "1200px",
      defaultColAlign: 'center',
      columns: [
        { type: 'autonumber', title: 'Pos', name: "position", width: 40 },
        {
          type: 'dropdown', title: 'Code', name: "code", width: 165, source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond",
            "RH-S Bocht Links-Rechts",
            "RH-S Bocht Voor-Rechts",
            "RH-S Bocht Achter-Rechts",
            "RH-S Bocht Voor-Achter",
            "RH-S Bocht voor en verloop",
            "RH-S Bocht links en verloop",
            "RH-S Bocht achter en verloop",
            "RH-S Bocht voor en vierkant-rond",
            "RH-S Bocht links en vierkant-rond",
            "RH-S Bocht achter en vierkant-rond",
            "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"]
        },
        { type: 'numeric', title: 'Aantal', name: "number", width: 40, /* source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] */ },
        { type: 'text', title: 'A', name: "a", width: 32, readOnly: true },
        { type: 'text', title: 'B', name: "b", width: 32, readOnly: true },
        { type: 'text', title: 'C', name: "c", width: 32, readOnly: true },
        { type: 'text', title: 'D', name: "d", width: 32, readOnly: true },
        { type: 'text', title: 'E', name: "e", width: 32, readOnly: true },
        { type: 'text', title: 'F', name: "f", width: 32, readOnly: true },
        { type: 'text', title: 'G1', name: "g1", width: 32, readOnly: true },
        { type: 'text', title: 'G2', name: "g2", width: 32, readOnly: true },
        { type: 'text', title: 'H1', name: "h1", width: 32, readOnly: true },
        { type: 'text', title: 'H2', name: "h2", width: 32, readOnly: true },
        { type: 'text', title: 'I1', name: "i1", width: 32, readOnly: true },
        { type: 'text', title: 'I2', name: "i2", width: 32, readOnly: true },
        { type: 'text', title: 'K1', name: "k1", width: 32, readOnly: true },
        { type: 'text', title: 'K2', name: "k2", width: 32, readOnly: true },
        { type: 'numeric', title: 'L1', name: "l1", width: 40, mask: '#,##0.00' },
        { type: 'numeric', title: 'L2', name: "l2", width: 40, mask: '#,##0.00' },
        { type: 'numeric', title: 'L3', name: "l3", width: 40, mask: '#,##0.00' },
        { type: 'text', title: 'L4', name: "l4", width: 40 },
        { type: 'dropdown', title: 'Connection 1', name: "connection1", width: 71, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 2', name: "connection2", width: 71, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 3', name: "connection3", width: 71, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'text', title: 'Opmerkingen', name: "note", width: 80 },
        { type: 'hidden', name: "id" },
      ],
      onload(instance, x) {
        if (self.projectId == 0)
          self.data.forEach((element, indx) => instance.jexcel.setValue(`A${indx + 1}`, self.zeroPad(indx + 1, 3)));
      },
      oninsertrow(instance, x, y) {
        let currRow = this.data.length - 1,
          nextRow = this.data.length;

        let currNumber = instance.jexcel.getValue(`A${currRow}`);
        if (currNumber == '')
          instance.jexcel.setValue(`A${nextRow}`, self.zeroPad(1, 3));
        else
          instance.jexcel.setValue(`A${nextRow}`, self.zeroPad(parseInt(currNumber) + 1, 3));
      },
      oneditionend(instance, cell, x, y, value, save) {
        if (x == 0) { // Pos
          // C (Aantal)
          instance.jexcel.setValue(`C${y + 1}`, value > 0 && value != '' ? 1 : '');
        }
        else if (x == 1) { // Code
          self.product = self.products.filter(x => x.name == value)[0];

          self.setReadOnly(false, y + 1);

          // D
          if (value == '')
            instance.jexcel.setValue(`D${y + 1}`, '');
          else if (self.lookupBreedte.indexOf(value) >= 0)
            instance.jexcel.setValue(`D${y + 1}`, 'A'); //'Breedte');
          else if (self.lookupBreedteOnder.indexOf(value) >= 0)
            instance.jexcel.setValue(`D${y + 1}`, 'A'); //'Breedte Onder');

          self.setCellValuesByCode(instance, value, y);

          let con1 = instance.jexcel.getValue(`V${y + 1}`),
            con2 = instance.jexcel.getValue(`W${y + 1}`),
            con3 = instance.jexcel.getValue(`X${y + 1}`);

          self.setCellValuesByCodeAndConnection(instance, value, con1, con2, con3, y);

          self.setReadOnly(true, y + 1);
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
        // else if (x == 17 || x == 18 || x == 19) {
        //   let code = instance.jexcel.getValue(`B${y + 1}`),
        //     con1 = instance.jexcel.getValue(`V${y + 1}`),
        //     con2 = instance.jexcel.getValue(`W${y + 1}`),
        //     l1 = instance.jexcel.getValue(`R${y + 1}`),
        //     l2 = instance.jexcel.getValue(`S${y + 1}`),
        //     l3 = instance.jexcel.getValue(`T${y + 1}`);
        //   self.setLCellValue(instance, code, con1, con2, value, y, x == 17, x == 18, x == 19, l1, l2, l3);
        // }
      },
      onchange(instance, cell, x, y, value, save) {
        if ((x == 17 || x == 18 || x == 19)) {
          let code = instance.jexcel.getValue(`B${y + 1}`),
            con1 = instance.jexcel.getValue(`V${y + 1}`),
            con2 = instance.jexcel.getValue(`W${y + 1}`),
            l1 = instance.jexcel.getValue(`R${y + 1}`),
            l2 = instance.jexcel.getValue(`S${y + 1}`),
            l3 = instance.jexcel.getValue(`T${y + 1}`);
          self.setLCellValue(instance, code, con1, con2, value, y, x == 17, x == 18, x == 19, l1, l2, l3);
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
      onselection(instance, x1, y1, x2, y2, origin) {
        if (!self.isStatusEditable)
          return;
        if (x1 == 1 || x1 == 21 || x1 == 22 || x1 == 23) {
          var columnName = jexcel.getColumnNameFromId([x1, y1]);
          var cell = instance.jexcel.getCell(columnName);
          instance.jexcel.openEditor(cell);
          cell.children[0].dropdown.close(true);
        }
        //if (x1 == 1) {
        let val = instance.jexcel.getValueFromCoords(1, y1);
        self.product = self.products.filter(x => x.name == val)[0];
        //}

        // if (x1 == 1) {
        //   var columnName = jexcel.getColumnNameFromId([x1, y1]);
        //   var cell = instance.jexcel.getCell(columnName);
        //   cell.classList.add('readonly');
        //   // instance.jexcel.openEditor(cell);
        //   cell.children[0].dropdown.close(true);
        // }

        // if (!self.isStatusEditable)
        //   cell.classList.add('readonly');
        //   return;
      }
    });

    // Round
    this.roundSheet = jexcel(this.sheetround.nativeElement, {
      data: this.dataRound,
      minDimensions: [4, 10],
      allowInsertColumn: false,
      editable: this.isStatusEditable,
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
        { type: 'dropdown', title: 'Code', name: "code", width: 150, source: ["Spirobuis lengte 3m.", "B45", "B90", "Spirobocht 45gr", "Spirobocht 90gr", "Verbinding buis", "Verbinding hulpstuk", "Verloop sym", "Verloop A-sym", "Zadel 90gr", "Zadel 45gr", "Deksel t.b.v. buis", "Platte tuit 90gr", "Platte tuit 45gr", "Regelklep", "T-stuk"] },
        { type: 'numeric', title: 'Aantal', name: "number", width: 80 },
        { type: 'dropdown', title: 'Diameter 1', name: "diameter1", width: 80, mask: '#,##0.00', source: ["100", "125", "160", "200", "250", "315", "355", "400", "450", "500", "560", "630", "710", "800", "900", "1,000", "1,120", "1,250"] },
        { type: 'dropdown', title: 'Diameter 2', name: "diameter2", width: 80, mask: '#,##0.00', source: ["100", "125", "160", "200", "250", "315", "355", "400", "450", "500", "560", "630", "710", "800", "900", "1,000", "1,120", "1,250"] },
        { type: 'hidden', name: "id" },
      ],
      oneditionend(instance, cell, x, y, value, save) {
        if (x == 0) { // Code
          self.product = self.products.filter(x => x.name == value)[0];
        }
      },
      onselection(instance, x1, y1) {
        if (!self.isStatusEditable)
          return;
        if (x1 == 0 || x1 == 2 || x1 == 3) {
          var columnName = jexcel.getColumnNameFromId([x1, y1]);
          var cell = instance.jexcel.getCell(columnName);
          instance.jexcel.openEditor(cell);
          cell.children[0].dropdown.close(true);
        }

        //if (x1 == 0) {
        let val = instance.jexcel.getValueFromCoords(0, y1);
        self.product = self.products.filter(x => x.name == val)[0];
        //}
      }
    });

    // Montagerail
    this.montagerailSheet = jexcel(this.sheetmontagerail.nativeElement, {
      data: this.dataMontagerail,
      minDimensions: [3, 10],
      allowInsertColumn: false,
      editable: this.isStatusEditable,
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
          type: 'dropdown', title: 'Code', name: "code", width: 210, source: ["Montagerail 30x15mm.", "Montagerail 30x20mm.", "Montagerail 30x43mm.", "Beugel met rubber (per stuk)",
            "Balkklem_M8 (200 stuks)", "Bevestigingsanker M8 (100 stuks)", "Boorschroef 42_13 (500 stuks)", "Boorschroef 42_19 (500 stuks)", "Boorschroef 63_19 (500 stuks)",
            "Carrosseriering M8x30 (200 stuks)", "Draadeind M8_2000 (per stuk)", "Expressanker M8x15 (100 stuks)", "Flensmoer M8ZB (200 stuks)", "Inslaganker M8x30 (100 stuks)",
            "Kabelband 7,5 x 540mm (per stuk)", "Siliconenkit Neutraal (1 tube)", "Koppelmoer M8x25 (100 stuks)", "Kozijnplug 5x50 (200 stuks)", "Luchtbev. hoek M8 (100 stuks)",
            "Messingplug M8x30 (100 stuks)", "Montageband kunststof", "Montagetape 50mm. 15m.", "Plafondanker", "Profielklem", "Slangenklem 60_135", "Slangenklem 60_165",
            "Slangenklem 60_215", "Slangenklem 60_270", "Slangenklem 60_325", "Slangklemband", "Slangklembandsluiting", "Slotbout M8x25", "Slotbout M8x30",
            "Snelanker M6x35", "Snelhanger 15-150", "Tapbout M8x25", "TDC Clip", "Tochtband", "Tuimelplug M8", "Zeskantmoer M8"]
        },
        { type: 'numeric', title: 'Aantal', name: "number", width: 80 },
        { type: 'numeric', title: 'Length', name: "length", width: 80, mask: '#,##0.00' },
        { type: 'hidden', name: "id" },
      ],
      oneditionend(instance, cell, x, y, value, save) {
        if (x == 0) { // Code
          self.product = self.products.filter(x => x.name == value)[0];
        }
      },
      onselection(instance, x1, y1) {
        if (!self.isStatusEditable)
          return;
        if (x1 == 1) {
          var columnName = jexcel.getColumnNameFromId([x1, y1]);
          var cell = instance.jexcel.getCell(columnName);
          instance.jexcel.openEditor(cell);
          cell.children[0].dropdown.close(true);
        }

        //if (x1 == 0) {
        let val = instance.jexcel.getValueFromCoords(1, y1);
        self.product = self.products.filter(x => x.name == val)[0];
        //}
      }
    });

    // Totaalblad rectangular
    this.rectangularDisplay = jexcel(this.sheetDisplay.nativeElement, {
      data: this.dataRectangularDisplay,
      minDimensions: [24, 0],
      allowInsertColumn: false,
      allowInsertRow: false,
      allowDeleteRow: false,
      editable: false,
      contextMenu: false,
      csvFileName: 'BIMair-order-items',
      csvHeaders: true,
      csvDelimiter: ',',
      includeHeadersOnDownload: true,
      tableOverflow: true,
      tableWidth: "1200px",
      defaultColAlign: 'center',
      columns: [
        { type: 'autonumber', title: 'Pos', name: "position", width: 40 },
        { type: 'dropdown', title: 'Code', name: "code", width: 165, source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] },
        { type: 'numeric', title: 'Aantal', name: "number", width: 40, /* source: ["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"] */ },
        { type: 'text', title: 'A', name: "a", width: 32, },
        { type: 'text', title: 'B', name: "b", width: 32 },
        { type: 'text', title: 'C', name: "c", width: 32 },
        { type: 'text', title: 'D', name: "d", width: 32 },
        { type: 'text', title: 'E', name: "e", width: 32 },
        { type: 'text', title: 'F', name: "f", width: 32 },
        { type: 'text', title: 'G1', name: "g1", width: 32 },
        { type: 'text', title: 'G2', name: "g2", width: 32 },
        { type: 'text', title: 'H1', name: "h1", width: 32 },
        { type: 'text', title: 'H2', name: "h2", width: 32 },
        { type: 'text', title: 'I1', name: "i1", width: 32 },
        { type: 'text', title: 'I2', name: "i2", width: 32 },
        { type: 'text', title: 'K1', name: "k1", width: 32 },
        { type: 'text', title: 'K2', name: "k2", width: 32 },
        { type: 'numeric', title: 'L1', name: "l1", width: 40, mask: '#,##0.00' },
        { type: 'numeric', title: 'L2', name: "l2", width: 40, mask: '#,##0.00' },
        { type: 'numeric', title: 'L3', name: "l3", width: 40, mask: '#,##0.00' },
        { type: 'text', title: 'L4', name: "l4", width: 40 },
        { type: 'dropdown', title: 'Connection 1', name: "connection1", width: 71, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 2', name: "connection2", width: 71, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 3', name: "connection3", width: 71, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'text', title: 'Opmerkingen', name: "note", width: 80 },
        { type: 'hidden', name: "id" },
      ]
    });

    // Totaalblad round
    this.roundDisplay = jexcel(this.sheetroundDisplay.nativeElement, {
      data: this.dataRoundDisplay,
      minDimensions: [4, 0],
      allowInsertColumn: false,
      editable: false,
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
        { type: 'dropdown', title: 'Code', name: "code", width: 150, source: ["Spirobuis lengte 3m.", "B45", "B90", "Spirobocht 45gr", "Spirobocht 90gr", "Verbinding buis", "Verbinding hulpstuk", "Verloop sym", "Verloop A-sym", "Zadel 90gr", "Zadel 45gr", "Deksel t.b.v. buis", "Platte tuit 90gr", "Platte tuit 45gr", "Regelklep", "T-stuk"] },
        { type: 'numeric', title: 'Aantal', name: "number", width: 80 },
        { type: 'dropdown', title: 'Diameter 1', name: "diameter1", width: 80, mask: '#,##0.00', source: ["100", "125", "160", "200", "250", "315", "355", "400", "450", "500", "560", "630", "710", "800", "900", "1,000", "1,120", "1,250"] },
        { type: 'dropdown', title: 'Diameter 2', name: "diameter2", width: 80, mask: '#,##0.00', source: ["100", "125", "160", "200", "250", "315", "355", "400", "450", "500", "560", "630", "710", "800", "900", "1,000", "1,120", "1,250"] },
        { type: 'hidden', name: "id" },
      ],
    });

    // Totaalblad montagerail
    this.montagerailDisplay = jexcel(this.sheetmontagerailDisplay.nativeElement, {
      data: this.dataMontagerailDisplay,
      minDimensions: [3, 0],
      allowInsertColumn: false,
      editable: false,
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
          type: 'dropdown', title: 'Code', name: "code", width: 210, source: ["Montagerail 30x15mm.", "Montagerail 30x20mm.", "Montagerail 30x43mm.", "Beugel met rubber (per stuk)",
            "Balkklem_M8 (200 stuks)", "Bevestigingsanker M8 (100 stuks)", "Boorschroef 42_13 (500 stuks)", "Boorschroef 42_19 (500 stuks)", "Boorschroef 63_19 (500 stuks)",
            "Carrosseriering M8x30 (200 stuks)", "Draadeind M8_2000 (per stuk)", "Expressanker M8x15 (100 stuks)", "Flensmoer M8ZB (200 stuks)", "Inslaganker M8x30 (100 stuks)",
            "Kabelband 7,5 x 540mm (per stuk)", "Siliconenkit Neutraal (1 tube)", "Koppelmoer M8x25 (100 stuks)", "Kozijnplug 5x50 (200 stuks)", "Luchtbev. hoek M8 (100 stuks)",
            "Messingplug M8x30 (100 stuks)", "Montageband kunststof", "Montagetape 50mm. 15m.", "Plafondanker", "Profielklem", "Slangenklem 60_135", "Slangenklem 60_165",
            "Slangenklem 60_215", "Slangenklem 60_270", "Slangenklem 60_325", "Slangklemband", "Slangklembandsluiting", "Slotbout M8x25", "Slotbout M8x30",
            "Snelanker M6x35", "Snelhanger 15-150", "Tapbout M8x25", "TDC Clip", "Tochtband", "Tuimelplug M8", "Zeskantmoer M8"]
        },
        { type: 'numeric', title: 'Aantal', name: "number", width: 80 },
        { type: 'numeric', title: 'Length', name: "length", width: 80, mask: '#,##0.00' },
        { type: 'hidden', name: "id" },
      ]
    });

    //EndOf Totaalblad

  }; //EndOf ngAfterViewInit

  setCellValuesByCode = (instance, value, y) => {

    // Set E
    if (value == '')
      instance.jexcel.setValue(`E${y + 1}`, '');
    else if (["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`E${y + 1}`, 'B'); //'Diepte');
    else if ("RH Verloop" == value)
      instance.jexcel.setValue(`E${y + 1}`, 'B'); //'Diepte Onder');

    // SET F
    if (value == '')
      instance.jexcel.setValue(`F${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`F${y + 1}`, 'C'); //'Breedte Links');
    else if (["RH Bocht", "RH Verloop"].indexOf(value) >= 0)
      instance.jexcel.setValue(`F${y + 1}`, 'C'); //'Breedte Boven');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`F${y + 1}`, 'C'); // 'Breedte Linksonder');
    else if ("RH Afgesch. Kanaal" == value)
      instance.jexcel.setValue(`F${y + 1}`, 'C'); // 'Breedte schuine zijde');
    else if (["RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`F${y + 1}`, 'C'); // 'Breedte Bocht onder');
    else if (["RH Recht kanaal", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond",
      "RH Deksel", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`F${y + 1}`, '');

    // SET G
    if (value == '')
      instance.jexcel.setValue(`G${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`G${y + 1}`, 'D'); //'Breedte Rechts');
    else if ("RH Verloop" == value)
      instance.jexcel.setValue(`G${y + 1}`, 'D'); //'Diepte Boven');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`G${y + 1}`, 'D'); //'Breedte Linksboven');
    else if (["RH-S Bocht en Verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`G${y + 1}`, 'D'); //'Breedte Bocht Boven');
    else if (["RH Recht kanaal", "RH Bocht", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`G${y + 1}`, '');

    // SET H
    if (value == '')
      instance.jexcel.setValue(`H${y + 1}`, '');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`H${y + 1}`, 'E'); //'Breedte Rechtsboven');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`H${y + 1}`, 'E'); //'Verloop Breedte Boven');
    else if (["RH Recht kanaal", "RH T-Stuk", "RH Bocht", "RH Verloop", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`H${y + 1}`, '');

    // SET I
    if (value == '')
      instance.jexcel.setValue(`I${y + 1}`, '');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`I${y + 1}`, 'F'); //'Verloop Diepte Boven');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH-S Bocht 2x", "RH-S Bocht en Verloop",
      "RH-S Bocht + Vierkant-rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`I${y + 1}`, '');

    // SET J
    if (value == '')
      instance.jexcel.setValue(`J${y + 1}`, '');
    else if (["RH Bocht", "RH Verloop", "RH-S Bocht en Verloop", "RH=S Bocht + Vierkant-rond", "RH Sprong", "RH Afgesch. Kanaal"].indexOf(value) >= 0)
      instance.jexcel.setValue(`J${y + 1}`, 'G1'); //'Graden');
    else if ("RH-S Bocht + Vierkant-rond" == value)
      instance.jexcel.setValue(`J${y + 1}`, 'G1'); //'Graden Bocht');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`J${y + 1}`, 'G1'); //'Graden Links');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal",
      "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`J${y + 1}`, '');

    // SET K
    if (value == '')
      instance.jexcel.setValue(`K${y + 1}`, '');
    else if ("RH-S Bocht + Vierkant-rond" == value)
      instance.jexcel.setValue(`K${y + 1}`, 'G2'); //'Graden Verloop');
    else if ("RH-S Bocht 2x" == value)
      instance.jexcel.setValue(`K${y + 1}`, 'G2'); //Graden Rechts');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH-S Bocht en Verloop", "RH Aftakking", "RH Vierkant-Rond", "RH Deksel",
      "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`K${y + 1}`, '');

    // SET L
    if (value == '')
      instance.jexcel.setValue(`L${y + 1}`, '');
    else if ("RH Bocht" == value)
      instance.jexcel.setValue(`L${y + 1}`, 'H1'); //'Radius');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`L${y + 1}`, 'H1'); //'Radius Links');

    else if (["RH T-Stuk", "RH-S Bocht 2x"].indexOf(value) >= 0)
      instance.jexcel.setValue(`L${y + 1}`, 'H1'); //'Radius Links');
    else if (["RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`L${y + 1}`, 'H1'); //'Radius Bocht');
    else if (["RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond", "RH Deksel",
      "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`L${y + 1}`, '');

    // SET M
    if (value == '')
      instance.jexcel.setValue(`M${y + 1}`, '');
    else if (["RH T-Stuk", "RH-S Bocht 2x"].indexOf(value) >= 0)
      instance.jexcel.setValue(`M${y + 1}`, 'H2'); //'Radius Rechts');
    else if (["RH-S Bocht + Vierkant-rond", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH Bocht", "RH Verloop", "RH T-Stuk", "RH Sprong",
      "RH Aftakking", "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`M${y + 1}`, '');

    // SET N
    if (value == '')
      instance.jexcel.setValue(`N${y + 1}`, '');
    else if (["RH T-Stuk", "RH Sprong"].indexOf(value) >= 0)
      instance.jexcel.setValue(`N${y + 1}`, 'I1'); //'Extensie Links');
    else if (["RH Aftakking", "RH Bocht", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`N${y + 1}`, 'I1'); //'Extensie Boven');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`N${y + 1}`, 'I1'); //'Extensie Onder');
    else if (["RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking", "RH Vierkant-Rond",
      "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`N${y + 1}`, '');

    // SET O
    if (value == '')
      instance.jexcel.setValue(`O${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`O${y + 1}`, 'I2'); //'Extensie onder Links');
    else if (["RH Verloop", "RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`O${y + 1}`, 'I2'); //'Offset Breedte');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`O${y + 1}`, 'I2'); //'Extensie Onder');
    else if (["RH Bocht", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking",
      "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`O${y + 1}`, '');

    // SET P
    if (value == '')
      instance.jexcel.setValue(`P${y + 1}`, '');
    else if (["RH T-Stuk", "RH Sprong"].indexOf(value) >= 0)
      instance.jexcel.setValue(`P${y + 1}`, 'K1'); //'Extension Rechts');
    else if (["RH Bocht", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`P${y + 1}`, 'K1'); //'Extensie Onder');
    else if ("RH-S Bocht en Verloop" == value)
      instance.jexcel.setValue(`P${y + 1}`, 'K1'); //'Extensie Bocht');
    else if (["RH Bocht", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking",
      "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`P${y + 1}`, '');

    // SET Q
    if (value == '')
      instance.jexcel.setValue(`Q${y + 1}`, '');
    else if ("RH T-Stuk" == value)
      instance.jexcel.setValue(`Q${y + 1}`, 'K2'); //'Extension Onder Rechts');
    else if (["RH Verloop", "RH-S Bocht en verloop", "RH-S Bocht + Vierkant-rond"].indexOf(value) >= 0)
      instance.jexcel.setValue(`Q${y + 1}`, 'K2'); //'Offset Diepte');
    else if (["RH Bocht", "RH-S Bocht en Verloop", "RH Recht kanaal", "RH-S Bocht 2x", "RH Verloop", "RH T-Stuk", "RH Sprong", "RH Aftakking",
      "RH Vierkant-Rond", "RH Deksel", "RH Afgesch. Kanaal", "RH Plenum", "RH VP Raam", "RH Vlakke Plaat", "RH Flexibel"].indexOf(value) >= 0)
      instance.jexcel.setValue(`Q${y + 1}`, '');
  }

  setCellValuesByCodeAndConnection = (instance, code, con1, con2, currVal, y) => {

    let val = null;

    // Set R
    if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
      val = 1410;
    else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
      val = 1456;
    else if (code == "R" && con1 != "W" && con2 != "W")
      val = 1500;
    else if (["S", "V", "P"].indexOf(code) >= 0)
      val = 0;
    else if (code == "J")
      val = 50;
    else if (code == "F")
      val = 330;

    instance.jexcel.setValue(`R${y + 1}`, val);
    if (val != null && val > 0)
      return;

    // SET S
    if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
      val = 1160;
    else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
      val = 1456;
    else if (code == "R" && con1 != "W" && con2 != "W")
      val = 1500;
    else if (["S", "V", "P"].indexOf(code) >= 0)
      val = 0;
    else if (code == "J")
      val = 50;
    else if (code == "F")
      val = 330;

    instance.jexcel.setValue(`S${y + 1}`, val);
    if (val != null && val > 0)
      return;

    // SET T
    if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
      val = 910;
    else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
      val = 1456;
    else if (code == "R" && con1 != "W" && con2 != "W")
      val = 1500;
    else if (["S", "V", "P"].indexOf(code) >= 0)
      val = 0;
    else if (code == "J")
      val = 50;
    else if (code == "F")
      val = 330;

    instance.jexcel.setValue(`T${y + 1}`, val);
  }

  setLCellValue = (instance, code, con1, con2, currVal, y, isL1, isL2, isL3, l1, l2, l3) => {

    let val = currVal > 0 ? currVal : null;

    // Set R
    if (isL3 && (l3 == '' || l3 == 0)) {
      if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
        val = 1410;
      else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
        val = 1456;
      else if (code == "R" && con1 != "W" && con2 != "W")
        val = 1500;
      else if (["S", "V", "P"].indexOf(code) >= 0)
        val = 0;
      else if (code == "J")
        val = 50;
      else if (code == "F")
        val = 330;

      instance.jexcel.setValue(`R${y + 1}`, val);
      if (val != null && val > 0)
        return;
    }

    // SET S
    if (isL1 && (l1 == '' || l1 == 0)) {
      if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
        val = 1160;
      else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
        val = 1456;
      else if (code == "R" && con1 != "W" && con2 != "W")
        val = 1500;
      else if (["S", "V", "P"].indexOf(code) >= 0)
        val = 0;
      else if (code == "J")
        val = 50;
      else if (code == "F")
        val = 330;

      instance.jexcel.setValue(`S${y + 1}`, val);
      if (val != null && val > 0)
        return;
    }

    // SET T
    if (isL2 && (l2 == '' || l2 == 0)) {
      if (code == "RH Recht kanaal" && con1 == "TDC25" && con2 == "TDC25")
        val = 910;
      else if ((code == "R" && con1 == "W" && con2 != "W") || (code == "R" && con1 != "W" && con2 == "W"))
        val = 1456;
      else if (code == "R" && con1 != "W" && con2 != "W")
        val = 1500;
      else if (["S", "V", "P"].indexOf(code) >= 0)
        val = 0;
      else if (code == "J")
        val = 50;
      else if (code == "F")
        val = 330;

      instance.jexcel.setValue(`T${y + 1}`, val);
    }
  }

  toggelTab(activeTab) {
    this.activeTab = activeTab;

    this.getJsonDataSheet();

    // Totaalblad-rectangular
    var _rectangular = this.data.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    this.dataRectangularDisplay = _rectangular;
    this.rectangularDisplay.setData(this.dataRectangularDisplay);

    // Totaalblad-round
    var _round = this.dataRound.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    this.dataRoundDisplay = _round;
    this.roundDisplay.setData(this.dataRoundDisplay);

    // Totaalblad-montagerail
    var _montagerail = this.dataMontagerail.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    this.dataMontagerailDisplay = _montagerail;
    this.montagerailDisplay.setData(this.dataMontagerailDisplay);

    // this.dataTotaalblad = this.getJsonDataSheet();
    // this.totaalbladSheet.setData(this.dataTotaalblad);
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
        this.rectangularSheet.download();
        this.roundSheet.download();
        this.montagerailSheet.download();
        // this.totaalbladSheet.download();
        break;
    }
  }

  sendByEmail = () => {
    // TBD
    this.alertService.showMessage('Success', `Order sent successfully`, MessageSeverity.success);
  }

  save(confirmOrder: boolean) {

    let jsonData = this.getJsonDataSheet();

    console.log(confirmOrder)
    this.projectService.saveOrderItems(jsonData, confirmOrder)
      .subscribe(x => this.saveSuccessHelper(), error => this.saveFailedHelper(error));

  }

  getJsonDataSheet() {
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
    // var totaalbladData = this.totaalbladSheet.getJson();
    // totaalbladData.forEach(function (element) {
    //   element.ProductType = "Totaalblad";
    //   element.ProjectId = prjId;
    // });

    rectangularData = rectangularData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    this.data = rectangularData;
    roundData = roundData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    this.dataRound = roundData;
    montagerailData = montagerailData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);
    this.dataMontagerail = montagerailData
    // totaalbladData = totaalbladData.filter(x => x.code?.trim() != '' && x.code != null && x.code != undefined);

    let jsonData = [...rectangularData, ...roundData, ...montagerailData]; // , ...totaalbladData
    return jsonData;
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

  setReadOnly = (readonly: boolean, y: number) => {
    if (readonly) {
      this.rectangularSheet.getCell(`D${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`E${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`F${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`G${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`H${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`I${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`J${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`K${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`L${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`M${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`N${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`O${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`P${y}`).classList.add('readonly');
      this.rectangularSheet.getCell(`Q${y}`).classList.add('readonly');
    }
    else {
      this.rectangularSheet.getCell(`D${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`E${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`F${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`G${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`H${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`I${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`J${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`K${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`L${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`M${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`N${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`O${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`P${y}`).classList.remove('readonly');
      this.rectangularSheet.getCell(`Q${y}`).classList.remove('readonly');
    }
  }
  zeroPad = (num, places) => String(num).padStart(places, '0')
}
