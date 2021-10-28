export class Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  address: string;
  userId: string;
  orders: [];
  //
  private firstName: string;
  private lastName: string;
  private salary: number;



  constructor(id: number, name: string, email: string, phoneNumber: string, city: string, country: string, address: string, userId: string, orders: []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.country = country;
    this.address = address;
    this.userId = userId;
    this.orders = orders;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getYearlySalary(): number {
    return 12 * this.salary;
  }

}
