import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerServices } from '../customer-services';  


@Component({
  selector: 'app-customer-details',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css',
})
export class CustomerDetails {
  constructor(private cs:CustomerServices) 
  {

  }

  search_customer_by_id(id: string, tdid: HTMLElement, tname: HTMLElement, tage: HTMLElement) 
  {
    let c=this.cs.get_customer_details(id);
    if (c!=null)
    {
        tdid.innerText=c.id;
        tname.innerText=c.name;
        tage.innerText=c.age.toString();
    }
    else
    {
        tdid.innerText="";
        tname.innerText="";
        tage.innerText="";
        alert("Customer not found");
    }
  }
}
