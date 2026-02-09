import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book50 } from '../services/book50';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {

  book: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: Book50,
    private cdr: ChangeDetectorRef
  ) {}

  goBack() {
    this.router.navigate(['/ex50']);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('DETAIL ID:', id); 
      if (id) {
        this.loadBook(id);
      }
    });
  }

  loadBook(id: string) {
    console.log('CALL API WITH ID:', id); 
    this.bookService.getBookById(id).subscribe({
      next: data => {
        console.log('BOOK DATA:', data); 
        this.book = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('API ERROR', err);
      }
    });
  }

  deleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.book.id).subscribe({
        next: () => {
          alert('Book deleted successfully!');
          this.router.navigate(['/ex50']);
        },
        error: err => {
          console.error('Delete error:', err);
          alert('Failed to delete book!');
        }
      });
    }
  }
}