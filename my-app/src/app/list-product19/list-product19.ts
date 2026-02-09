import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-product19',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-product19.html',
  styleUrl: './list-product19.css',
})
export class ListProduct19 {
  products = [
    { id: 1, name: 'Laptop Dell XPS 15', price: 1500, stock: 25 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 1200, stock: 50 },
    { id: 3, name: 'Samsung Galaxy S24', price: 999, stock: 35 },
    { id: 4, name: 'Sony WH-1000XM5', price: 399, stock: 60 },
    { id: 5, name: 'iPad Pro 12.9"', price: 1099, stock: 40 }
  ];
}