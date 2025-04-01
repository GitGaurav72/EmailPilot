import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TemplateService {
  private apiUrl = `https://65.0.199.14:8443/emailPilot_api/api/mailcontent`;

  constructor(private http: HttpClient) { }
  addTemplate(template: any): Observable<any> {
    console.log('Calling API:', this.apiUrl); 
    return this.http.post(this.apiUrl, template);
  }
  getTemplateList(page: number, size: number, userId : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usr/${userId}?page=${page}&size=${size}`);
  }

  getTemplateById(Id : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }

  addEmailGroup(emailGrp: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, emailGrp);
  }


}