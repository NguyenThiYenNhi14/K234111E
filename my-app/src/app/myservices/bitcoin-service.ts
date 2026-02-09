import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IBitcoinResponse } from '../myclasses/iBitcoin';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  private apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  constructor(private http: HttpClient) {}

  getBitcoinPrice(): Observable<IBitcoinResponse> {
    return this.http.get<IBitcoinResponse>(this.apiUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
