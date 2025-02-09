import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/emailService';
import { AesDecryptService } from '../../services/aes.service';

@Component({
  selector: 'app-add-email-group-dialog',
  standalone: true,
  imports: [MatDialogModule,
  RouterModule,
    CommonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-email-group-dialog.component.html',
  styleUrl: './add-email-group-dialog.component.css'
})

export class AddEmailGroupDialogComponent implements OnInit {
  emailGroupForm: FormGroup;
  emailList: string[] = [];
  emails: any[] = [];
  userId: string | null = localStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmailGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emailService: EmailService,
    public aesService: AesDecryptService,
  ) {
    this.emailGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      selectedEmails: [[], Validators.required] // Ensure selectedEmails is an array
    });
  }

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.emailService.getEmails(0, 0, this.userId ?? '').subscribe(
      (data: any) => {
        this.emails = data;
        this.emailList = data.map((emailObj: any) => emailObj.mailId);
        console.log("Extracted Email List:", this.emailList);
      },
      (error) => {
        console.error('Error fetching emails:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.emailGroupForm.valid) {
      console.log("Form Submitted:", this.emailGroupForm.value);
      this.dialogRef.close(this.emailGroupForm.value);
    }
  }
}
