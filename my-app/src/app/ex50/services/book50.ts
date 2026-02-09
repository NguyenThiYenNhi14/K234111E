import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Book50 {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBook(data: FormData) {
  return this.http.post<any>(
    "http://localhost:3000/books",
    data
  );}

  updateBook(id: string, formData: FormData): Observable<any> {
  return this.http.put(`http://localhost:3000/books/${id}`, formData);}

  deleteBook(id: string) {
  return this.http.delete(
    `http://localhost:3000/books/${id}`
  );}

  uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  return this.http.post<any>(
    'http://localhost:3001/upload-image',
    formData
  );}

}
