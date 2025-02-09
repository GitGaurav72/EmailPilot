import { Component,OnInit } from '@angular/core';
import { EmailGroupService } from '../../services/emailGroupService';
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
import { AesDecryptService } from '../../services/aes.service';
import { AddEmailGroupDialogComponent } from '../add-email-group-dialog/add-email-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [RouterModule,
    CommonModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit {
  emailGroup: any[] = [];
  currentPage = 1;
  itemsPerPage = 30;
  totalEmails = 0;
  userId: string | null = localStorage.getItem('userId'); // ✅ Declare userId as a class property
  constructor(
    private emailService: EmailGroupService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.emailService.getEmailGruoup(this.currentPage, this.itemsPerPage, this.userId ?? '').subscribe(
      (data: any) => {
        this.emailGroup = data;
        this.totalEmails = data.total;
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

  openAddEmailGroupDialog(): void {
    const dialogRef = this.dialog.open(AddEmailGroupDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEmailGroup(result);
      }
    });
  }

  saveEmailGroup(data: any): void {
    // Call your service to save the email group
    data.mGrpNm =  data.groupName;
    data.adedUsr =  this.userId;
    data.mailIds = data.selectedEmails;
    data.addTs = new Date().toISOString();
    data.updtTs= new Date().toISOString();
    this.emailService.addEmailGroup(data).subscribe(
      (response) => {
        this.snackBar.open('Email group added successfully', 'Close', { duration: 3000 });
        this.loadEmails(); // Refresh the list
      },
      (error) => {
        console.error('Error saving email group:', error);
        this.snackBar.open('Failed to add email group', 'Close', { duration: 3000 });
      }
    );
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