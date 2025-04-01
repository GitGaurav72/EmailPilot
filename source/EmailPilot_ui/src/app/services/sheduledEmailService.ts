import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SheduledEmailService {
  private apiUrl = `https://65.0.199.14:8443/emailPilot_api/api/scheduled-emails`;

  constructor(private http: HttpClient) { }
  addTemplate(template: any): Observable<any> {
    console.log('Calling API:', this.apiUrl); // ✅ Log API URL
    return this.http.post(this.apiUrl, template);
  }
  getSheduleEmailList(page: number, size: number, userId : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}?page=${page}&size=${size}`);
  }

  AddSheduleEmail(sheduleEmail: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/shdlmail`, sheduleEmail);
  }


}