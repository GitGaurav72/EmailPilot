import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  currentTime: string = '';

  constructor(private router: Router) {
    this.updateTime();
  }

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
}
