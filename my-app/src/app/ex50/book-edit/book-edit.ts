import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book50 } from '../services/book50';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.css'
})
export class BookEdit implements OnInit {
  book: any = { id: '', title: '', author: '', price: 0, image: '' };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: Book50,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.loadBook(id);
    });
  }

  loadBook(id: string): void {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe({
      next: data => {
        this.book = data;
        if (this.book.image) {
          const isNewUpload = /^\d{13}-/.test(this.book.image);
          this.previewUrl = isNewUpload
            ? `http://localhost:3000/uploads/${this.book.image}`
            : `http://localhost:3001/upload/${this.book.image}`;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Load error:', err);
        alert('Failed to load book!');
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrl = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.book.image = '';
  }

  onSubmit(): void {
    if (!this.book.title || !this.book.price) {
      alert('Please fill in all required fields!');
      return;
    }

    this.isLoading = true;

    if (this.selectedFile) {
      // Step 1: Upload new image to port 3001
      this.bookService.uploadImage(this.selectedFile).subscribe({
        next: (res: any) => {
          // Step 2: Attach filename, then send plain JSON to port 3000
          this.book.image = res.filename;
          this.updateBookJson();
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          alert('Image upload failed! Saving changes without new image.');
          this.updateBookJson();
        }
      });
    } else {
      // No new image — just send plain JSON to port 3000
      this.updateBookJson();
    }
  }

  private updateBookJson(): void {
    this.bookService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        alert('Book updated successfully!');
        this.router.navigate(['/ex50/detail', this.book.id]);
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('Failed to update book!');
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/ex50/detail', this.book.id]);
  }
}