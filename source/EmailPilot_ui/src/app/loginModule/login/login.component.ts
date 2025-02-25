import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginCredentials, ApiResponse, LoginReposne } from '../../interfaces';
import { AuthService } from '../../services/authService';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials: LoginCredentials = {
    usernameOrEmail: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    // Add the callback function to the global window object
     (window as any).handleGoogleSignIn = (response: any) => this.handleGoogleSignIn(response);

  }

  loginWithGoogle() {
    const clientId = '480994039355-onmo5u45ouohmps41i0f8riq2g9hq0v6.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:4200/auth/callback'; // Ensure this is registered in Google Console
    const scope = 'openid email profile';
    const responseType = 'code';
    const responseMode = 'query';
    const state = 'random_state'; // Optional: Protect against CSRF

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&response_mode=${responseMode}&state=${state}`;

    // Redirect the user to Google's OAuth page
    window.location.href = authUrl;
  }

  onLogin() {
    console.log('Username/Email:', this.credentials.usernameOrEmail);
    console.log('Password:', this.credentials.password);
    this.authService.login(this.credentials).subscribe({
      next: (response: ApiResponse<LoginReposne>) => {
        if (response.success) {
          console.log('Login successful!', response.data);
          localStorage.setItem('authToken', response.data?.token || '');
          localStorage.setItem('userId', response.data?.id || ''); // Store token
          this.router.navigate(['/mailShedularDashboard']);
        } else {
          console.error('Login failed:', response.message);
        }
      },
      error: (error) => {
        console.error('Error during login:', error);
      },
    });
  }

  handleGoogleSignIn(response: any) {
    const authCode = response.code; // Extract the authorization code
    this.sendAuthCodeToBackend(authCode);
  }

  sendAuthCodeToBackend(authCode: string) {
    const backendUrl = 'http://localhost:8080/auth/google/callback';
    this.http.post(backendUrl, { code: authCode })
      .subscribe(
        (response: any) => {
          console.log('Login successful', response);
          // Handle successful login (e.g., store token, redirect)
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login error
        }
      );
  }

}