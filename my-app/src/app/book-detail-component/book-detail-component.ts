import { Component } from '@angular/core';
import { BookAPIServices } from '../myservices/book-apiservices';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail-component.html',
  styleUrls: ['./book-detail-component.css'],
})
export class BookDetailComponent {
  book: any;
  errMessage: string = '';

  constructor(
    private _service: BookAPIServices,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.activeRouter.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.searchBook(bookId);
      }
    });
  }

  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (err) => {
        this.errMessage = err.message || err;
      }
    });
  }
}
