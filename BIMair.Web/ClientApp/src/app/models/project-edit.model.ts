// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { Project } from './project.model';
import { Customer } from './customer.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class ProjectEdit extends Project {
  constructor(id?: number, name?: string, description?: string, customerName?: string, customerId?: number, number?: number, reference?: string,
    deliveryAddress?: string, deliveryDate?: Date, dateCreated?: Date, dateModified?: Date, status?: number) { //, customer?: Customer) {
    super();
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
    this.status = status;
    //this.customer = customer;
  }

  public id: number;
  public name: string;
  public description: string;
  public customerName: string;
  public number: number;
  public reference: string;
  public deliveryAddress: string;
  public deliveryDate: Date;
  public dateCreated: Date;
  public dateModified: Date;
  customerId: number;
  status: number;
  // customer: Customer;
  // orders: any[];

}

export enum ProjectStatus {
  Created = 1,
  OrderConfirmed = 3,
}

