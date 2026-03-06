import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Book50 } from '../services/book50';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-create.html',
  styleUrls: ['./book-create.css']
})
export class BookCreate {
  book: any = { id: '', title: '', author: '', price: null };
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private service: Book50, private router: Router) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    // Always use FormData — backend uses multer which handles both text fields and file
    const formData = new FormData();
    formData.append('id',     this.book.id     ?? '');
    formData.append('title',  this.book.title  ?? '');
    formData.append('author', this.book.author ?? '');
    formData.append('price',  this.book.price?.toString() ?? '0');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.service.createBook(formData).subscribe({
      next: () => {
        alert('Book saved successfully!');
        this.router.navigate(['/ex50/books']);
      },
      error: err => {
        console.error('Create error:', err);
        alert('Failed to save book!');
      }
    });
  }
}