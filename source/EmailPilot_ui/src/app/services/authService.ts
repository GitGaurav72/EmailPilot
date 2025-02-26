import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, ApiResponse, LoginCredentials,LoginReposne, RegisterCredentials } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<ApiResponse<LoginReposne>> {
    return this.http.post<ApiResponse<LoginReposne>>(`${this.apiUrl}/login`, credentials);
  }

  register(Credentials: RegisterCredentials): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/register`, Credentials);
  }

  
  loginWithGoogle(idToken: String): Observable<ApiResponse<LoginReposne>> {
    return this.http.post<ApiResponse<LoginReposne>>(`${this.apiUrl}/login`, idToken);
  }
  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
    return token !== null && token !== undefined;
}


}