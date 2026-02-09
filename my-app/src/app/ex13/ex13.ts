import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService13 } from '../myservices/product-service13';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex13',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ex13.html',
  styleUrl: './ex13.css',
})
export class Ex13 {
  public products:any
  constructor(pservice: ProductService13,private router:Router){
    this.products=pservice.getProductsWithImages()
  }
  viewDetail(f:any)
  {
    this.router.navigate(['app-ex13-detail',f.ProductId])
  } 
}
