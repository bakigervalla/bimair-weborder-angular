// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { Project } from './project.model';
import { Customer } from './customer.model';


export class ProjectEdit extends Project {
    constructor(id?: number, name?:string, description?: string, customerName?: string, number?: number, reference?: string,
      deliveryAddress?: string, deliveryDate?: Date, dateCreated?: Date, dateModified?: Date, customer?: Customer) {
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
        this.customer = customer;
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
    public customer: Customer;
}
