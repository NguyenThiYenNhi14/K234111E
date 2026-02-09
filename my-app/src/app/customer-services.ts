import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerServices {
  customers=[
    {id:'c1', name:'Putin', age:70, picture:"putin"},
    {id:'c2', name:'Putin', age:50, picture:"putin"},
    {id:'c3', name:'Putin', age:30, picture:"putin"},
    {id:'c4', name:'Putin', age:34, picture:"putin"},
  ];
  constructor() {}
  get_all_customers() 
  {
    return this.customers;
  }
  get_customer_details(id:string)
  {
    let c=this.customers.find(cust=>cust.id===id);
    return c
  }
  filter_customers_by_age(a:number,b:number)
  {
    return this.customers.filter(c=>c.age>=a && c.age<=b)
  }

}
