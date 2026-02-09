import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})

export class ProductDetail {
  products=[{"id":"p1","name":"Coca","price":15,"image":"images/coca.jpg"},
            {"id":"p2","name":"Pepsi","price":10,"image":"images/pepsi.jpg"},
            {"id":"p3","name":"Sting","price":20,"image":"images/sting.jpg"},
            {"id":"p4","name":"Heleiken","price":-10,"image":"images/heleiken.jpg"},
            {"id":"p5","name":"SaiGon","price":-20,"image":"images/SaiGon.jpg"},
  ]
  product_selected: any;
  constructor(private router:Router, private activeRouter:ActivatedRoute)
  {
    //dùng router để điều hướng
    //dùng asctiveRouter để nhận điều hướng
    activeRouter.paramMap.subscribe(param=>{
      const id=param.get('id')
      this.product_selected=this.products.find(p=>p.id==id)
    })
  }

  goback()
  {
    this.router.navigate(["san-pham-1",{id:this.product_selected.id}])
  }
}
