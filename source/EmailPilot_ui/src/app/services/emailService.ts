// email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private apiUrl = `https://localhost:8080/api/mailids`;

  constructor(private http: HttpClient) { }
  addEmail(emailData: any): Observable<any> {
    console.log('Calling API:', this.apiUrl); // ✅ Log API URL
    return this.http.post(this.apiUrl, emailData);
  }
  getEmails(page: number, size: number, userId : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usr/${userId}?page=${page}&size=${size}`);
  }

  uploadFile(file: File, fileType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload/${fileType}`, formData);
  }
}