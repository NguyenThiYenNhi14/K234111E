import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-fashion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class FashionComponent {
fashions:any;
errMessage:string=''
constructor(public _service: FashionApiService){
this._service.getFashions().subscribe({
next:(data)=>{this.fashions=data},
error:(err)=>{this.errMessage=err}
})
}
}
