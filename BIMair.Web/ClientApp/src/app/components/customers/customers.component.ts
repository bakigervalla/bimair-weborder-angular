// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Utilities } from '../../services/utilities';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [fadeInOut]
})
export class CustomersComponent implements OnInit {
  rows = new Array<Customer>();
  rowsCache = [];
  totalCount: Number = 0;
  closeResult: string;
  dataParams: any = {
    page_num: '',
    page_size: ''
  };

  private isLoading: boolean = false;
  loadingIndicator = true;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.isLoading = true;
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 20;

    setTimeout(() => { this.loadingIndicator = false; }, 1500);

    this.getCustomers();

  }

  private getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.rows = customers;
        this.rowsCache = [...customers];
        // this.totalCount = projects.length
        // this.rowsCache = [...projects];
        this.isLoading = false;
      });


  }

  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r =>
      Utilities.searchArray(value, false, r.name, r.email, r.phoneNumber, r.address, r.city, r.country, r.user)
    );
  }
}
