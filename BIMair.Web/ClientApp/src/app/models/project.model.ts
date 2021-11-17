import { Customer } from './customer.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Project {

  constructor(id?: number, name?:string, description?: string, customerName?: string, customerId?: number, number?: number, reference?: string,
              deliveryAddress?: string, deliveryDate?: NgbDateStruct, dateCreated?: Date, dateModified?: Date) { //, customer?: Customer) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.customerName = customerName;
      this.number = number;
      this.reference = reference;
      this.deliveryAddress = deliveryAddress;
      this.deliveryDate = deliveryDate;
      this.dateCreated = dateCreated;
      this.dateModified = dateModified;
      this.customerId = customerId
      //this.customer = customer;
  }

  id: number;
  name: string;
  description: string;
  customerName: string;
  number: number;
  reference: string;
  deliveryAddress: string;
  deliveryDate: NgbDateStruct;
  rectangularDuctwork: string;
  roundDuctwork: string;
  totalList: string;
  dateCreated: Date;
  dateModified: Date;
  customerId: number;
  // customer: Customer;
  // orders: any[];
};
