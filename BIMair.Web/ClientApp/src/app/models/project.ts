import { Customer } from './customer.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  number: string;
  reference: string;
  deliveryAddress: string;
  deliveryDate: Date;
  rectangularDuctwork: string;
  roundDuctwork: string;
  totalList: string;
  dateCreated: Date;
  dateModified: Date;
  customer: Customer;
  orders: any[];
};
