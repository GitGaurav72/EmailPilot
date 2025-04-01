import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterCredentials, User, ApiResponse } from '../../interfaces';
import { AuthService, } from '../../services/authService';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component'; 
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,RouterModule,TermsOfServiceComponent, PrivacyPolicyComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  Credentials: RegisterCredentials = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: ''
  };

  agreeToTerms: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    if (!this.agreeToTerms) {
      alert('You must agree to the Privacy Policy and Terms of Service.');
      return;
    }

    this.authService.register(this.Credentials).subscribe({
      next: (response: ApiResponse<User>) => {
        if (response.success) {
          console.log('Registration successful!', response.data);
          this.router.navigate(['/login']);
        } else {
          console.error('Registration failed:', response.message);
        }
      },
      error: (error) => {
        console.error('Error during registration:', error);
      },
    });
  }
}
