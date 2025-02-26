import { Component } from '@angular/core';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css'
})
export class BottomNavbarComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
   
      library.add(faFacebook, faTwitter, faLinkedin, faInstagram);
    
  }

  
}
