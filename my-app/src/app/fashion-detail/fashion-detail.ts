import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetailComponent {
  fashion: any;
  searchId: string = '';
  errMessage: string = '';

  constructor(public _service: FashionApiService) {}

  search() {
    this.errMessage = '';
    this.fashion = null;
    this._service.getFashion(this.searchId).subscribe({
      next: (data) => { this.fashion = data; },
      error: (err) => { this.errMessage = err.message; }
    });
  }
}