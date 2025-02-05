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

import { AppComponent } from './app.component'; // ✅ Ensure AppComponent is imported
import { AuthInterceptor } from './interceptor/auth.interceptor'; // ✅ Ensure AuthInterceptor is imported

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
    MatButtonModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },      // ✅ Enable hash-based routing globally
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // ✅ Add AuthInterceptor
  ],
  bootstrap: [] // ✅ Ensure AppComponent is bootstrapped
})
export class AppModule { }
