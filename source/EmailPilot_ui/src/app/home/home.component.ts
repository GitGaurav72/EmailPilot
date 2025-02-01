import { Component } from '@angular/core';
import {RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  composeEmail() {
    this.router.navigate(['/composeEmail']);
  }

  viewScheduledEmails() {
    this.router.navigate(['/scheduled-emails']);
  }
}