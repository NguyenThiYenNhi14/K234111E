import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Book50 {
  private apiUrl    = 'http://localhost:3000/books';
  private uploadUrl = 'http://localhost:3000/uploads';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Port 3000 uses express.json() — send plain JSON object
  createBook(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Port 3000 uses express.json() — send plain JSON object
  updateBook(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Port 3001 — send FormData for image upload
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<any>(this.uploadUrl, formData);
  }
}