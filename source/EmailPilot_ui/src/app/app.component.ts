import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivacyPolicyComponent } from './loginModule/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './loginModule/terms-of-service/terms-of-service.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TermsOfServiceComponent, PrivacyPolicyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmailPilot';
  @ViewChild('privacyPolicy') privacyPolicy!: PrivacyPolicyComponent;
  @ViewChild('termsOfService') termsOfService!: TermsOfServiceComponent;
}
