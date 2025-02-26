import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  currentTime: string = '';



  updateTime() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleString(); // Shows Date & Time in local format
    }, 1000); // Updates every second
  }

  logout() {
    // Clear user session and redirect to login
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/login']);
  }
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;
  userProfilePic: string = '../../assets/images/logo.PNG';
  userName: string = 'John Doe'; // This should be dynamically set from user data

  constructor(private authService: AuthService, private router : Router, public notificationService: NotificationService) {
    this.updateTime();
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('firstname') ?? 'Default Name';
      // this.userProfilePic = this.authService.getUserProfilePic();
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // logout() {
  //   this.authService.logout();
  //   this.isLoggedIn = false;
  // }

  login() {
    this.router.navigate(['/login']);
  }
}
