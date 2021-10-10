export class Customer {
  private id: number;
  private firstName: string;
  private lastName: string;
  private salary: number;

  constructor(id: number, firstName: string, lastName, salary: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getYearlySalary(): number {
    return 12 * this.salary;
  }

}
