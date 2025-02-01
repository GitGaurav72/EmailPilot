
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './loginModule/login/login.component';
import { SigninComponent } from './loginModule/signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { EmailGroupComponent } from './email-group/email-group.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent }, // Login page
    { path: 'register', component: SigninComponent }, // Register page
    { path: 'composeEmail', component: ComposeEmailComponent},
    { path: 'emailGroup', component: EmailGroupComponent},
    { path: 'mailShedularDashboard', component: DashboardComponent},
    { path: '**', redirectTo: '' } 
    
];
@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)], // Use RouterModule.forRoot for the root module
    exports: [RouterModule] // Export RouterModule to make the router directives available
})
export class AppRoutingModule { }

