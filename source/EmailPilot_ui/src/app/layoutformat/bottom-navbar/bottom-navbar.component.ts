import { Component } from '@angular/core';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from '../../loginModule/privacy-policy/privacy-policy.component';


@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, PrivacyPolicyComponent  ],
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
