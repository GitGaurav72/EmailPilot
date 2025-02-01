import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

    lname: string = '';
    fname: string = '';
    uname: string = '';
    email: string = '';
    password: string = '';
  
    constructor(private router: Router) {}
  
    onRegister() {
      // Add your registration logic here
      console.log('Name:', this.fname);
      console.log('Email:', this.email);
      console.log('Password:', this.password);
  
      // For now, navigate to the login page
      this.router.navigate(['/login']);
    }
  }
