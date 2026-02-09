import { Component } from '@angular/core';
import { BookAPIServices } from '../myservices/book-apiservices';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books:any;
  errMessage:string=''
    constructor(private _service: BookAPIServices, private router:Router, private activeRouter: ActivatedRoute){
      this._service.getBooks().subscribe({
        next:(data)=>{this.books=data},
        error:(err)=>{this.errMessage=err}
  })
  }
  view_detail(bookId:any)
  {
    this.router.navigate(["/ex41",bookId])
  }

}
