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

    if (code) {
      this.exchangeCodeForToken(code);
    } else {
      console.error('Authorization code not found.');
      this.router.navigate(['/login']); // Redirect to login if no code is found
    }
  }

  exchangeCodeForToken(code: string) {
    const backendUrl = 'http://localhost:8080/auth/google/callback';

    this.http.post(backendUrl, { code }).subscribe({
      next: (response: any) => {
        console.log('Token exchange successful', response);

        // Store token and navigate to dashboard
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/mailShedularDashboard']);
      },
      error: (error) => {
        console.error('Token exchange failed', error);
        this.router.navigate(['/login']);
      },
    });
  }
}
