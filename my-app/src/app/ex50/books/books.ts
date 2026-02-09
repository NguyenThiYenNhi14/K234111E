import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book50 } from '../services/book50';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books: any[] = [];

  constructor(private bookService: Book50) {}

  ngOnInit(): void {
  this.bookService.getBooks().subscribe(data => {
    console.log('BOOKS FROM API:', data);
    this.books = data;
  });
}
  delete(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(b => b.id !== id);
      });
    }}
}
