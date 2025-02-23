import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TemplateService {
  private apiUrl = `https://localhost:8080/api/mailcontent`;

  constructor(private http: HttpClient) { }
  addTemplate(template: any): Observable<any> {
    console.log('Calling API:', this.apiUrl); // ✅ Log API URL
    return this.http.post(this.apiUrl, template);
  }
  getTemplateList(page: number, size: number, userId : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usr/${userId}?page=${page}&size=${size}`);
  }

  addEmailGroup(emailGrp: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, emailGrp);
  }


}