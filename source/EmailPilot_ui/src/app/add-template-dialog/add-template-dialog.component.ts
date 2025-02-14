import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormControl, FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-add-template-dialog',
  standalone: true,
  imports: [
     MatDialogModule,
    RouterModule,
      CommonModule, 
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      ReactiveFormsModule,QuillModule, FormsModule, CommonModule],
  templateUrl: './add-template-dialog.component.html',
  styleUrl: './add-template-dialog.component.css'
})

export class AddTemplateDialogComponent implements OnInit {
  templateForm: FormGroup;
  showCcBcc = false;
  subject: string = '';
  body: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTemplateDialogComponent>
  ) {
    this.templateForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      cc: [''],
      bcc: [''],
      body: ['', Validators.required]
    });
  }

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link']
    ]
  };
  ngOnInit(): void {}

  toggleCcBcc(): void {
    this.showCcBcc = !this.showCcBcc;
  }

  onSave(): void {
    if (this.templateForm.valid) {
      console.log(this.templateForm.value);
      this.dialogRef.close(this.templateForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}