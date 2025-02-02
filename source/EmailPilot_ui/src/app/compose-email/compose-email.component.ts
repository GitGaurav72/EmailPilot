import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { QuillModule } from 'ngx-quill';


@Component({
  selector: 'app-compose-email',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, CommonModule, QuillModule],
  templateUrl: './compose-email.component.html',
  styleUrl: './compose-email.component.css'
  
})
export class ComposeEmailComponent {
  to: string = '';
  subject: string = '';
  body: string = '';
  scheduleEmail: boolean = false;
  scheduledDateTime: string = '';
  timezone: string = 'UTC';

  // Autocomplete for email recipients
  emailControl = new FormControl();
  savedEmails: string[] = ['example1@example.com', 'example2@example.com', 'example3@example.com'];
  filteredEmails: Observable<string[]>;

  // Rich Text Editor Modules
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image']
    ]
  };

  constructor(private router: Router) {
    this.filteredEmails = this.emailControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmails(value))
    );
  }

  private _filterEmails(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.savedEmails.filter(email => email.toLowerCase().includes(filterValue));
  }

  goBack() {
    this.router.navigate(['/mailShedularDashboard']);
  }

  addCcBcc() {
    console.log('Add CC/BCC clicked');
  }

  uploadCsv() {
    console.log('Upload CSV clicked');
  }

  insertTemplate() {
    console.log('Insert Template clicked');
  }

  saveAsDraft() {
    console.log('Save as Draft clicked');
  }

  scheduleEmailAction() {
    console.log('Schedule Email clicked');
  }

  sendNow() {
    console.log('Send Now clicked');
  }
}