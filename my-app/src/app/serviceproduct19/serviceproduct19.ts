import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-serviceproduct19',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serviceproduct19.html',
  styleUrl: './serviceproduct19.css',
})
export class Serviceproduct19 {
  services = [
    { 
      icon: '🚚', 
      name: 'Fast Delivery', 
      description: 'Get your products delivered within 24-48 hours to your doorstep'
    },
    { 
      icon: '🔧', 
      name: 'Warranty Service', 
      description: 'Extended warranty coverage for all electronic products up to 3 years'
    },
    { 
      icon: '💳', 
      name: 'Easy Payment', 
      description: 'Multiple payment options including credit card, PayPal, and installments'
    },
    { 
      icon: '📞', 
      name: '24/7 Support', 
      description: 'Round-the-clock customer support via phone, email, and live chat'
    },
    { 
      icon: '↩️', 
      name: 'Easy Returns', 
      description: '30-day money-back guarantee with free return shipping'
    },
    { 
      icon: '🎁', 
      name: 'Gift Wrapping', 
      description: 'Professional gift wrapping service available for special occasions'
    }
  ];
}