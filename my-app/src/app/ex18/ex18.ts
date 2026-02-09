import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService18 } from '../myservices/customer-service18';

@Component({
  selector: 'app-ex18',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 implements OnInit {
  customerGroups: any[] = [];

  constructor(private customerService: CustomerService18) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customerGroups = data;
        console.log('Customer data loaded:', this.customerGroups);
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }
}