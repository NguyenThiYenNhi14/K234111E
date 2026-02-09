import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IBitcoinResponse } from '../myclasses/iBitcoin';
import { BitcoinService } from '../myservices/bitcoin-service';

@Component({
  selector: 'app-bitcoin',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './bitcoin.html',
  styleUrl: './bitcoin.css',
})
export class Bitcoin implements OnInit{
  bitcoinData?: IBitcoinResponse;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.loadBitcoinPrice();
  }

  loadBitcoinPrice(): void {
    this.loading = true;
    this.bitcoinService.getBitcoinPrice().subscribe({
      next: (data: IBitcoinResponse) => {
        this.bitcoinData = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.loading = false;
      },
    });
  }

  refresh(): void {
    this.loadBitcoinPrice();
  }
}
