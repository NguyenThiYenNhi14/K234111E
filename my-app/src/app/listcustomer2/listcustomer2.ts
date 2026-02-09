import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServices } from '../customer-services';


@Component({
  selector: 'app-listcustomer2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listcustomer2.html',
  styleUrl: './listcustomer2.css',
})
export class ListCustomer2 {
  customers: any;
  constructor(private cs: CustomerServices) {
    this.customers = cs.get_all_customers();
  }
}
