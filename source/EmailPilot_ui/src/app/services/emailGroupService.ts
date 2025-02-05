import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailGroupService {
  private apiUrl = `http://localhost:8080/api/mailgroups`;

  constructor(private http: HttpClient) { }
  addEmail(emailData: any): Observable<any> {
    console.log('Calling API:', this.apiUrl); // ✅ Log API URL
    return this.http.post(this.apiUrl, emailData);
  }
  getEmailGruoup(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usrid/11d63d78-7e8c-44d2-9714-f8e0c3fdd0d6?page=${page}&size=${size}`);
  }

  addEmailGroup(emailGrp: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, emailGrp);
  }


}