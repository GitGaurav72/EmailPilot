import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/emailService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';





@Component({
  selector: 'app-email-list',
  standalone: true,
  imports: [RouterModule,
    CommonModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.css'
})
export class EmailListComponent implements OnInit {
  emails: any[] = [];
  currentPage = 1;
  itemsPerPage = 30;
  totalEmails = 0;

  constructor(private emailService: EmailService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.emailService.getEmails(this.currentPage, this.itemsPerPage).subscribe(
      (data: any) => {
        this.emails = data
        this.totalEmails = data.total;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching emails:', error);
        this.snackBar.open('Failed to load emails', 'Close', { duration: 3000 });
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEmails();
  }

  onFileUpload(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (file) {
      this.emailService.uploadFile(file, fileType).subscribe(
        () => {
          this.snackBar.open(`${fileType.toUpperCase()} uploaded successfully!`, 'Close', { duration: 3000 });
          this.loadEmails();
        },
        (error) => {
          console.error(`Error uploading ${fileType}:`, error);
          this.snackBar.open(`Failed to upload ${fileType}`, 'Close', { duration: 3000 });
        }
      );
    }
  }

}