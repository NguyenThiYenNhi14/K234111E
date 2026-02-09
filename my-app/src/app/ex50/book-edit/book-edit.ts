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
  styleUrl: './book-edit.css',
})
export class BookEdit implements OnInit {

  book: any = {
    id: '',
    title: '',
    author: '',
    price: 0,
    image: '',
    category: '',
    description: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: Book50,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBook(id);
      }
    });
  }

  loadBook(id: string) {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe({
      next: data => {
        this.book = data;
        if (this.book.image) {
          this.previewUrl = `http://localhost:3001/upload/${this.book.image}`;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Load book error:', err);
        alert('Failed to load book data!');
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Preview image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.book.image = '';
  }

  onSubmit() {
    if (!this.book.title || !this.book.author || !this.book.price) {
      alert('Please fill in all required fields!');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('title', this.book.title);
    formData.append('author', this.book.author);
    formData.append('price', this.book.price.toString());
    
    if (this.book.category) {
      formData.append('category', this.book.category);
    }
    
    if (this.book.description) {
      formData.append('description', this.book.description);
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.bookService.updateBook(this.book.id, formData).subscribe({
      next: (response) => {
        console.log('Update success:', response);
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

  goBack() {
    this.router.navigate(['/ex50/detail', this.book.id]);
  }
}