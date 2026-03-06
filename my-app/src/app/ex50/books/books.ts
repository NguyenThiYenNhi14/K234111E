import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book50 } from '../services/book50';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {
  books: any[] = [];

  constructor(private bookService: Book50) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: data => this.books = data,
      error: err => console.error('Failed to load books:', err)
    });
  }

  // New uploads have timestamp prefix (e.g. 1234567890-name.jpg) → port 3000
  // Old default images (b1.png, b2.jpg) → port 3001
  getImageUrl(image: string): string {
    const isNewUpload = /^\d{13}-/.test(image);
    if (isNewUpload) {
      return `http://localhost:3000/uploads/${image}`;
    }
    return `http://localhost:3001/upload/${image}`;
  }

  delete(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.books = this.books.filter(b => b.id !== id),
        error: err => {
          console.error('Delete error:', err);
          alert('Failed to delete book!');
        }
      });
    }
  }
}