import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css'
})

export class TermsOfServiceComponent implements OnInit {
  isModalOpen: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Open the modal when the route matches '/legal/terms-of-service'
    if (this.route.snapshot.routeConfig?.path === 'legal/terms-of-service') {
      this.openModal();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    // After closing modal, navigate away from the route
    this.router.navigate([{ outlets: { primary: null }}]); // Removes the current route from URL
  }
}

