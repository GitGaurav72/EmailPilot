import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailGroupService {
  private apiUrl = `https://65.0.199.14:8443/emailPilot_api/api/mailgroups`;

  constructor(private http: HttpClient) { }
  addEmail(emailData: any): Observable<any> {
    console.log('Calling API:', this.apiUrl); // ✅ Log API URL
    return this.http.post(this.apiUrl, emailData);
  }
  getEmailGruoup(page: number, size: number, userId : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usrid/${userId}?page=${page}&size=${size}`);
  }

  getEmailGruoupId( id : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  addEmailGroup(emailGrp: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, emailGrp);
  }

  uploadFile(file: File, fileType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload/${fileType}`, formData);
  }
}