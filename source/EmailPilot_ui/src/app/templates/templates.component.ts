import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { QuillModule } from 'ngx-quill';

interface EmailTemplate {
  id: number;
  name: string;
  content: string;
}
@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, CommonModule, QuillModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})

export class TemplatesComponent {
  templates: EmailTemplate[] = [
    { id: 1, name: 'Welcome Email', content: '<p>Welcome to our platform!</p>' },
    { id: 2, name: 'Promotional Offer', content: '<p>Get 20% off on your first purchase!</p>' }
  ];

  isModalOpen: boolean = false;
  isEditing: boolean = false;
  templateName: string = '';
  templateContent: string = '';
  selectedTemplate: EmailTemplate | null = null;
  nextId: number = 3;

  // Rich Text Editor Configuration
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

  openCreateTemplateModal() {
    this.isEditing = false;
    this.templateName = '';
    this.templateContent = '';
    this.isModalOpen = true;
  }

  openEditTemplateModal(template: EmailTemplate) {
    this.isEditing = true;
    this.templateName = template.name;
    this.templateContent = template.content;
    this.selectedTemplate = template;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveTemplate() {
    if (this.isEditing && this.selectedTemplate) {
      const template = this.templates.find(t => t.id === this.selectedTemplate!.id);
      if (template) {
        template.name = this.templateName;
        template.content = this.templateContent;
      }
    } else {
      this.templates.push({
        id: this.nextId++,
        name: this.templateName,
        content: this.templateContent
      });
    }
    this.closeModal();
  }

  deleteTemplate(id: number) {
    this.templates = this.templates.filter(template => template.id !== id);
  }
}