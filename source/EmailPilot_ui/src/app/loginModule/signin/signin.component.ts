import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterCredentials, User, ApiResponse } from '../../interfaces';
import { AuthService, } from '../../services/authService';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

     Credentials : RegisterCredentials = {
       firstName : '',
       lastName : '',
       userName : '',
       email : '',
       password : '',

     };
     
  
    constructor(private router: Router, private authService : AuthService) {}
  
    onRegister() {
      console.log('Name:', this.Credentials.firstName);
      console.log('Email:', this.Credentials.lastName);
      console.log('Password:', this.Credentials.password);
  
       this.authService.register(this.Credentials).subscribe({
            next: (response: ApiResponse<User>) => {
              if (response.success) {
                console.log('Login successful!', response.data);
                this.router.navigate(['/mailShedularDashboard']);
              } else {
                console.error('Login failed:', response.message);
              }
            },
            error: (error) => {
              console.error('Error during login:', error);
            },
          });
      // For now, navigate to the login page
      this.router.navigate(['/login']);
    }
  }
