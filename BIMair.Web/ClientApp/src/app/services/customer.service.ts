import { Injectable } from '@angular/core';
import { CustomerEndpoint } from './customer-endpoint.service';
import { Customer } from '../models/customer.model';
import { Observable } from "rxjs";

@Injectable()
export class CustomerService {

  constructor(
    private customerEndpoint: CustomerEndpoint) {

  }

  getCustomers() {
    return this.customerEndpoint.getCustomersEndpoint<Customer[]>();
  }

}
