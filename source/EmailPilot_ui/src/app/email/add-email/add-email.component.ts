import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { EmailService } from '../../services/emailService'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-email',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  CommonModule],
  templateUrl: './add-email.component.html',
  styleUrl: './add-email.component.css'
})

export class AddEmailComponent {
  emailForm: FormGroup;
  userId: string | null = localStorage.getItem('userId'); // ✅ Declare userId as a class property
  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    this.emailForm = this.fb.group({
      mailId: ['', [Validators.required, Validators.email]],
      hrName: [''],
      cmpnyNm: ['']
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const newEmail = {
        ...this.emailForm.value,
        addTs: new Date().toISOString(),
        updtTs: new Date().toISOString(),
        addByUser : this.userId
      };
      this.emailService.addEmail(newEmail).subscribe({
        next: (response) => {
          this.snackBar.open('Email added successfully!', 'Close', {
            duration: 3000
          });
          this.router.navigate([`/emailList/${this.userId}`]);
        },
        error: (err) => {
          this.snackBar.open('Error adding email: ' + err.message, 'Close', {
            duration: 5000
          });
        }
      });
    }
  }
}