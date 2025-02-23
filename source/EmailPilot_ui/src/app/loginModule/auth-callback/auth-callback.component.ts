import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})

export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get authorization code from URL
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');
    if (code) {
      this.exchangeCodeForToken(code);
    } else {
      console.error('Authorization code not found.');
      this.router.navigate(['/login']); // Redirect to login if no code is found
    }
  }

  // exchangeCodeForToken(code: string) {
  //   const backendUrl = 'http://localhost:8080/auth/google/callback';

  //   this.http.post(backendUrl, { code }).subscribe({
  //     next: (response: any) => {
  //       console.log('Token exchange successful', response);

  //       // Store token and navigate to dashboard
  //       localStorage.setItem('authToken', response.token);
  //       localStorage.setItem('userId', response.userId);
  //       this.router.navigate(['/mailShedularDashboard']);
  //     },
  //     error: (error) => {
  //       console.error('Token exchange failed', error);
  //       this.router.navigate(['/login']);
  //     },
  //   });
  // }


  exchangeCodeForToken(code: string) {
  
    const redirectUri = 'http://localhost:4200/auth/callback';

    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const body = new URLSearchParams({
      code: code,

      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    this.http.post(tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).subscribe(
      (response: any) => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token; // Only if you requested offline access
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        // Store the tokens securely (e.g., in localStorage or a backend service)
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        // Redirect to home or another page
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error exchanging code for token:', error);
        this.router.navigate(['/']); // Redirect to home on error
      }
    );
  }
  
}
