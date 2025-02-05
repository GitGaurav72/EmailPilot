
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './loginModule/login/login.component';
import { SigninComponent } from './loginModule/signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { EmailGroupComponent } from './emailgroup/email-group/email-group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TemplatesComponent } from './templates/templates.component';
import { AddEmailComponent } from './email/add-email/add-email.component';
import { EmailListComponent } from './email/email-list/email-list.component';
import { GroupListComponent } from './emailgroup/group-list/group-list.component';


export const routes: Routes = [

    
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent }, // Login page
    { path: 'register', component: SigninComponent }, // Register page
    { path: 'composeEmail', component: ComposeEmailComponent},
    { path: 'emailGroup', component: EmailGroupComponent},
    { path: 'mailShedularDashboard', component: DashboardComponent},
    { path: 'analytics', component: AnalyticsComponent},
    { path: 'template', component: TemplatesComponent},
    { path: 'email/add', component :  AddEmailComponent},
    { path: 'emailGroup/:usrid', component : GroupListComponent},
    {path : 'emailList/:usrid', component :  EmailListComponent},
    { path: '**', redirectTo: '' } 

    
];
@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })], // Use RouterModule.forRoot for the root module
    exports: [RouterModule] // Export RouterModule to make the router directives available
})
export class AppRoutingModule { 

}

