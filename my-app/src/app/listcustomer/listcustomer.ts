import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listcustomer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers=[
    {id:'c1', name:'Putin', age:70, picture:"putin"},
    {id:'c2', name:'Putin', age:78, picture:"putin"},
    {id:'c3', name:'Putin', age:50, picture:"putin"},
    {id:'c4', name:'Putin', age:32, picture:"putin"},
  ]

}
