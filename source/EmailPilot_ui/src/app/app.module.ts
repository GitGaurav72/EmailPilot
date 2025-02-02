// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './loginModule/login/login.component';
// import { SigninComponent } from './loginModule/signin/signin.component';
// import { ComposeEmailComponent } from './compose-email/compose-email.component';
// import { EmailGroupComponent } from './email-group/email-group.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// @NgModule({
//   declarations: [
  
//   ],
//   imports: [
//     RouterModule.forRoot([
        
//           { path: '', component: HomeComponent },
//           { path: 'login', component: LoginComponent }, // Login page
//           { path: 'register', component: SigninComponent }, // Register page
//           { path: 'composeEmail', component: ComposeEmailComponent},
//           { path: 'emailGroup', component: EmailGroupComponent},
//           { path: 'mailShedularDashboard', component: DashboardComponent},
//           { path: '**', redirectTo: '' } 
//     ], { useHash: true }), // Enable hash-based routing
//     NgModule,
//     BrowserModule,
//     FormsModule,
//     ReactiveFormsModule,
//     BrowserAnimationsModule,
 

//   ],
//   providers: [
//     { provide: LocationStrategy, useClass: HashLocationStrategy }
//   ],
//   bootstrap: []
// })
// export class AppModule { }



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app.routes'; // ? Import AppRoutingModule
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './loginModule/login/login.component';
import { SigninComponent } from './loginModule/signin/signin.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { EmailGroupComponent } from './email-group/email-group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component'; // ? Ensure AppComponent is included
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    QuillModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } // ? Enable hash-based routing globally
  ],
  bootstrap: [] // ? Bootstrap with AppComponent
})
export class AppModule { }
