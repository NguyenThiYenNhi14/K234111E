import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private _apiUrl = 'http://localhost:3002';

  // ===== REGISTER =====
  register(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/register`, { username, password })
      .pipe(catchError(this.handleError));
  }

  // ===== LOGIN =====
  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/login`, { username, password })
      .pipe(catchError(this.handleError));
  }

  // ===== LƯU TOKEN =====
  saveToken(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  // ===== LẤY TOKEN =====
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ===== LẤY USERNAME =====
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // ===== KIỂM TRA ĐÃ LOGIN =====
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ===== LOGOUT =====
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  // ===== LẤY HTTP HEADERS CÓ TOKEN =====
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  handleError(error: HttpErrorResponse) {
    let msg = 'Lỗi không xác định!';
    if (error.error && error.error.message) {
      msg = error.error.message;
    } else if (error.message) {
      msg = error.message;
    }
    return throwError(() => new Error(msg));
  }
}