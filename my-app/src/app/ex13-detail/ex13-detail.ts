import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService13 } from '../myservices/product-service13';

@Component({
  selector: 'app-ex13-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ex13-detail.html',
  styleUrl: './ex13-detail.css',
})
export class Ex13Detail {
  selectedProduct:any
  constructor(private activateRoute:ActivatedRoute,private _fs:ProductService13,
  private router:Router)
  {
    activateRoute.paramMap.subscribe(
      (param)=>{
        let id=param.get('id')
        if(id!=null)
        {
          this.selectedProduct=_fs.getProductDetail(id)
        }
      }
    )
  }
  goBack(){
    this.router.navigate(['ex13'])
  }
}
