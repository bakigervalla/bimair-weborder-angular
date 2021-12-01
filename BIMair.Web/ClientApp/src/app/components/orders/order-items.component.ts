import { Component, ViewChild, HostListener, ElementRef } from "@angular/core";
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { ProjectService } from '../../services/project.service';
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
  activeTab = 'rectangular';
  isSaving = false;
  submitted = false;
  savedSuccessfully = false;

  @ViewChild("spreadsheet") spreadsheet: any;
  @ViewChild("sheetround") sheetround: any;
  @ViewChild("sheetmontagerail") sheetmontagerail: any;
  @ViewChild("sheettotaalblad") sheettotaalblad: any;
  data = [];
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

  constructor(private alertService: AlertService, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    let contextMenu = document.querySelector('.jcontextmenu') as HTMLElement;
    if (contextMenu)
      contextMenu.style.left = '-400px';
  }

  ngAfterViewInit() {

    // Rectangular
    this.rectangularSheet = jexcel(this.spreadsheet.nativeElement, {
      data: this.data,
      minDimensions: [24, 10],
      // freezeColumns: 2,
      tableOverflow: true,
      tableWidth: "1200px",
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
        Y1: 'text-align:right;',
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
        { type: 'dropdown', title: 'Connection 1', width: 60, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 2', width: 60, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'dropdown', title: 'Connection 3', width: 60, source: ["TDC25", "TDC35", "P25", "P35", "P25 Los", "P35 Los", "P20", "P30", "P20 Los", "P30 Los"] },
        { type: 'numeric', title: 'Length', width: 80, mask: '$ #,##.00', decimal: '.' },
      ],
      onselection: function (html, colNumber, rowNumber) {
        // console.log(this.currentRowNumber)
      },
      onchange(html, colNumber, rowNumber) {
        console.log(html);
        console.log(colNumber);
        console.log(rowNumber);
      },
      //   updateTable: function(el, cell, x, y, source, value, id) {
      //     if (x == 2 && y == 2) {
      //         cell.classList.add('readonly');
      //     }
      // }
    });

    // Round
    this.roundSheet = jexcel(this.sheetround.nativeElement, {
      data: this.dataRound,
      minDimensions: [4, 10],
      // freezeColumns: 2,
      // tableOverflow: true,
      // tableWidth: "600px",
      style: {
        A1: 'text-align:left;',
        B1: 'text-align: left;',
        C1: 'text-align:right;',
        D1: 'text-align: right;'
      },
      columns: [
        { type: 'dropdown', title: 'Code', width: 120, source: ["Spirobuis", "lengte 3m.", "B45", "B90", "Spirobocht 45gr", "Spirobocht 90gr", "Verbinding buis", "Verbinding hulpstuk", "Verloop sym", "Verloop A-sym", "Zadel 90gr", "Zadel 45gr", "Deksel t.b.v. buis", "Platte tuit 90gr", "Platte tuit 45gr", "Regelklep", "T-stuk"] },
        { type: 'text', title: 'Aantal', width: 120 },
        { type: 'numeric', title: 'Diameter 1', width: 80, mask: '$ #,##.00', decimal: '.' },
        { type: 'numeric', title: 'Diameter 2', width: 80, mask: '$ #,##.00', decimal: '.' },
      ],
      onselection: function (html, colNumber, rowNumber) {
        // console.log(this.currentRowNumber)
      }
    });

    // Montagerail
    this.montagerailSheet = jexcel(this.sheetmontagerail.nativeElement, {
      data: this.dataMontagerail,
      minDimensions: [3, 10],
      // freezeColumns: 2,
      // tableOverflow: true,
      // tableWidth: "600px",
      style: {
        A1: 'text-align:left;',
        B1: 'text-align: left;',
        D1: 'text-align: right;'
      },
      columns: [
        {
          type: 'dropdown', title: 'Code', width: 120, source: ["Montagerail 30x15mm.", "Montagerail 30x20mm.", "Montagerail 30x43mm.", "Beugel met rubber (per stuk)",
            "Balkklem_M8 (200 stuks)", "Bevestigingsanker M8 (100 stuks)", "Boorschroef 42_13 (500 stuks)", "Boorschroef 42_19 (500 stuks)", "Boorschroef 63_19 (500 stuks)",
            "Carrosseriering M8x30 (200 stuks)", "Draadeind M8_2000 (per stuk)", "Expressanker M8x15 (100 stuks)", "Flensmoer M8ZB (200 stuks)", "Inslaganker M8x30 (100 stuks)",
            "Kabelband 7,5 x 540mm (per stuk)", "Siliconenkit Neutraal (1 tube)", "Koppelmoer M8x25 (100 stuks)", "Kozijnplug 5x50 (200 stuks)", "Luchtbev. hoek M8 (100 stuks)",
            "Messingplug M8x30 (100 stuks)", "Montageband kunststof", "Montagetape 50mm. 15m.", "Plafondanker", "Profielklem", "Slangenklem 60_135", "Slangenklem 60_165",
            "Slangenklem 60_215", "Slangenklem 60_270", "Slangenklem 60_325", "Slangklemband", "Slangklembandsluiting", "Slotbout M8x25", "Slotbout M8x30",
            "Snelanker M6x35", "Snelhanger 15-150", "Tapbout M8x25", "TDC Clip", "Tochtband", "Tuimelplug M8", "Zeskantmoer M8"]
        },
        { type: 'text', title: 'Aantal', width: 120 },
        { type: 'numeric', title: 'Length', width: 80, mask: '$ #,##.00', decimal: '.' },
      ],
      onselection: function (html, colNumber, rowNumber) {
        // console.log(this.currentRowNumber)
      }
    });

    // Totaalblad
    this.totaalbladSheet = jexcel(this.sheettotaalblad.nativeElement, {
      data: this.dataTotaalblad,
      minDimensions: [25, 10],
      // freezeColumns: 2,
      tableOverflow: true,
      tableWidth: "1200px",
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
        { type: 'text', title: 'Pos', width: 100 },
        { type: 'text', title: 'Code', width: 100 },
        { type: 'text', title: 'Aantal', width: 100 },
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
        { type: 'text', title: 'Connection 1', width: 60 },
        { type: 'text', title: 'Connection 2', width: 60 },
        { type: 'text', title: 'Connection 3', width: 60 },
        { type: 'text', title: 'Remarks', width: 100 },
      ],
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

  toggelTab(activeTab) {
    this.activeTab = activeTab;
  }

  download() {
    switch (this.activeTab) {
      case "rectangular":
        this.rectangularSheet.download();
      case "round":
        this.roundSheet.download();
      case "montagerail":
        this.montagerailSheet.download();
      case "totaalblad":
        this.totaalbladSheet.download();
    }
  }

  save() {
    var rectangularArr = this.rectangularSheet.getData();
    var roundArr = this.roundSheet.getData();
    var montagerailArr = this.montagerailSheet.getData();
    var totaalbladArr = this.totaalbladSheet.getData();
    var arrayData = [...rectangularArr, ...roundArr, montagerailArr, totaalbladArr];

    var jsonOrderItems = JSON.stringify(arrayData);
    console.log(jsonOrderItems);
    return;

    var orderItems = [...this.data, ...this.dataRound, ...this.dataMontagerail, this.dataTotaalblad];

    this.projectService.saveOrder(orderItems)
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
