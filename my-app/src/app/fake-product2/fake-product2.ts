import { Component } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fake-product2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fake-product2.html',
  styleUrl: './fake-product2.css',
})
export class FakeProduct2 {
  data:any
    errMessage:string=''
    constructor(_service:FakeProductService){
      _service.getFakeProductData().subscribe({
        next:(data)=>{ this.data=data},
        error:(err)=>{
          this.errMessage=err
    }
    })
    }
  }
