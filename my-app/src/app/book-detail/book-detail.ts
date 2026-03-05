import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookAPIServices } from '../myservices/book-apiservices';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
   book:any; 
   errMessage:string='' 
   constructor(private _service: BookAPIServices, 
     private router: Router, 
     private activeRouter: ActivatedRoute,
     private cd: ChangeDetectorRef){ 
   } 
 
   ngOnInit(): void {
     this.activeRouter.paramMap.subscribe((param)=>{
       let id=param.get("id")
       if (id!=null){
         this.searchBook(id)
       }
     })
   }
 
   searchBook(bookId:string) 
   { 
     this._service.getBook(bookId).subscribe({ 
       next:(data)=>{
         this.book=data;
         this.cd.detectChanges();
       }, 
       error:(err)=>{
         this.errMessage=err;
         this.cd.detectChanges();
       } 
     }) 
   } 
 }