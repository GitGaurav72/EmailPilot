import { Component ,OnInit, OnDestroy, AfterViewInit  } from '@angular/core';
import {RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit  {
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;
  userProfilePic: string = 'assets/images/logo.PNG';
  userName: string = 'John Doe'; // This should be dynamically set from user data
  slideIndex = 0;
  slideInterval: any;
 constructor(private authService: AuthService, private router : Router) {
    
     this.isLoggedIn = this.authService.isAuthenticated();
     if (this.isLoggedIn) {
       this.userName = localStorage.getItem('firstname') ?? 'Default Name';
       // this.userProfilePic = this.authService.getUserProfilePic();
     }
   }

   ngOnInit() {
    this.startAutoSlide();
  }

  ngAfterViewInit() {
    this.setupInitialClasses();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.moveSlide();
    }, 1000); // Slide every 1 second
  }

  setupInitialClasses() {
    const slider = document.querySelector('.slider') as HTMLElement;
    const slides = document.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;
    
    // Clone first 3 cards and append to end for seamless looping
    for (let i = 0; i < 3; i++) {
        const clone = slides[i].cloneNode(true) as HTMLElement;
        clone.classList.add('clone');
        slider.appendChild(clone);
    }

    // Get all slides including clones
    const allSlides = document.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;
    
    // Activate first 3 original cards
    allSlides.forEach((slide, index) => {
        if (index < 3) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Set initial position
    this.slideIndex = 0;
    slider.style.transform = `translateX(0)`;
    slider.style.transition = 'transform 0.5s ease';
}

moveSlide() {
    const slider = document.querySelector('.slider') as HTMLElement;
    const allSlides = document.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;
    const totalSlides = allSlides.length;
    
    this.slideIndex++;
    const translateX = -(this.slideIndex * (100 / 3));
    
    // Smooth transition to next slide
    slider.style.transform = `translateX(${translateX}%)`;
    
    // When we reach the clones, instantly reset to originals without animation
    if (this.slideIndex >= totalSlides / 2) {
        setTimeout(() => {
            slider.style.transition = 'none';
            this.slideIndex = 0;
            slider.style.transform = `translateX(0)`;
            
            // Force reflow to apply the instant change
            void slider.offsetWidth;
            
            // Re-enable transitions
            slider.style.transition = 'transform 0.5s ease';
        }, 500); // This timeout should match your transition duration
    }
    
    // Update active classes for the current visible set
    allSlides.forEach(slide => slide.classList.remove('active'));
    for (let i = 0; i < 3; i++) {
        let index = (this.slideIndex + i) % (totalSlides / 2); // Mod by original count
        allSlides[index].classList.add('active');
    }
}
  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
   logout() {
    // Clear user session and redirect to login
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/']);
  }

  toggleMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.toggle('nav-active');
    }
  }
  composeEmail() {
    this.router.navigate(['/composeEmail']);
  }

  viewScheduledEmails() {
    this.router.navigate(['/scheduled-emails']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}