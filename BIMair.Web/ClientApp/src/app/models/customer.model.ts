export class Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  createdDate: Date;
  userId: string;
  user: string;
  orders: [];
  //
  private firstName: string;
  private lastName: string;
  private salary: number;

  constructor(id: number, name: string, email: string, phoneNumber: string, address: string, city: string, country: string, createdDate: Date, userId: string, user: string, orders: []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.country = country;
    this.createdDate = createdDate;
    this.userId = userId;
    this.user = user;
    this.orders = orders;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getYearlySalary(): number {
    return 12 * this.salary;
  }

}
