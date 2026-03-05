import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../myclasses/fashion';
import { AuthService } from './auth-service.ts';

@Injectable({
  providedIn: 'root',
})
export class FashionApiService {

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  private getOptions(): Object {
    const token = this._auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=utf-8',
      'Authorization': `Bearer ${token}`
    });
    return { headers, responseType: 'text' };
  }

  getFashions(): Observable<any> {
    return this._http.get<any>('/fashions', this.getOptions()).pipe(
      map(res => JSON.parse(res) as Array<Fashion>),
      retry(3),
      catchError(this.handleError)
    );
  }

  getFashion(id: string): Observable<any> {
    return this._http.get<any>(`/fashions/${id}`, this.getOptions()).pipe(
      map(res => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}