import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {
  products=[{"id":"p1","name":"Coca","price":15,"image":"images/coca.jpg"},
            {"id":"p2","name":"Pepsi","price":10,"image":"images/pepsi.jpg"},
            {"id":"p3","name":"Sting","price":20,"image":"images/sting.jpg"},
            {"id":"p4","name":"Heleiken","price":-10,"image":"images/heleiken.jpg"},
            {"id":"p5","name":"SaiGon","price":-20,"image":"images/SaiGon.jpg"},
  ]
  selected_id:any;
  constructor(private router:Router, private activeRouter:ActivatedRoute)
  {
    //dùng router để điều hướng, dùng asctiveRouter để nhận điều hướng
    activeRouter.paramMap.subscribe((param)=>{
      this.selected_id=param.get("id")
    })
  }
  view_detail(pid:string)
  {
    //alert("bạn muốn xem chi tiết sản phảm có ID="+pid)
    this.router.navigate(["san-pham-1",pid])
  }
}
