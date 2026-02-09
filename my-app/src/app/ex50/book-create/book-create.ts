import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { Router } from '@angular/router';
import { Book50 } from '../services/book50';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './book-create.html',
  styleUrls: ['./book-create.css']
})
export class BookCreate {
  book: any = {};
  selectedFile!: File;
  imagePreview: any;

  constructor(
    private service: Book50,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  save() {
    if (this.selectedFile) {
    this.book.image = this.selectedFile.name; // chỉ lấy tên file
  }

  this.service.createBook(this.book).subscribe(() => {
    alert('Saved successfully');
    this.router.navigate(['/ex50/books']);
  });
}}
