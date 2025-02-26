import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // ✅ Import HttpClientModule

import { AppRoutingModule } from './app.routes'; // ✅ Import AppRoutingModule
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuillModule } from 'ngx-quill';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component'; // ✅ Ensure AppComponent is imported
import { AuthInterceptor } from './interceptor/auth.interceptor'; // ✅ Ensure AuthInterceptor is imported
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    // ✅ Add AppComponent here
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Remove duplicate
    BrowserAnimationsModule,
    HttpClientModule, // ✅ Required for HttpClient to work
    AppRoutingModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    QuillModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    FontAwesomeModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://your-backend-api'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },      // ✅ Enable hash-based routing globally
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: OAuthStorage, useValue: localStorage },
    NotificationService // ✅ Add AuthInterceptor
  ],
  bootstrap: [] // ✅ Ensure AppComponent is bootstrapped
})
export class AppModule {

  constructor() {
    library.add(faFacebook, faTwitter, faLinkedin, faInstagram);
  }
 }
