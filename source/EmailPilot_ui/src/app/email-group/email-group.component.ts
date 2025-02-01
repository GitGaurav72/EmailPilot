import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface EmailGroup {
  id: number;
  name: string;
  emails: string[];
}

@Component({
  selector: 'app-email-group',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-group.component.html',
  styleUrl: './email-group.component.css'
})

export class EmailGroupComponent {
  emailGroups: EmailGroup[] = [];
  isModalOpen: boolean = false;
  isEmailModalOpen: boolean = false;
  isEditing: boolean = false;
  groupName: string = '';
  newEmail: string = '';
  selectedGroup: EmailGroup = { id: 0, name: '', emails: [] };
  nextId: number = 1;

    constructor(private router: Router) {
      // this.filteredEmails = this.emailControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filterEmails(value))
      // );
    }
  openCreateGroupModal() {
    this.isEditing = false;
    this.groupName = '';
    this.isModalOpen = true;
  }
  goBack() {
    this.router.navigate(['/mailShedularDashboard']);
  }
  openEditGroupModal(group: EmailGroup) {
    this.isEditing = true;
    this.groupName = group.name;
    this.selectedGroup = group;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveGroup() {
    if (this.isEditing) {
      const group = this.emailGroups.find(g => g.id === this.selectedGroup.id);
      if (group) {
        group.name = this.groupName;
      }
    } else {
      this.emailGroups.push({
        id: this.nextId++,
        name: this.groupName,
        emails: []
      });
    }
    this.closeModal();
  }

  deleteGroup(id: number) {
    this.emailGroups = this.emailGroups.filter(group => group.id !== id);
  }

  openAddEmailsModal(group: EmailGroup) {
    this.selectedGroup = group;
    this.isEmailModalOpen = true;
  }

  closeEmailModal() {
    this.isEmailModalOpen = false;
  }

  addEmail() {
    if (this.newEmail && !this.selectedGroup.emails.includes(this.newEmail)) {
      this.selectedGroup.emails.push(this.newEmail);
      this.newEmail = '';
    }
  }

  removeEmail(email: string) {
    this.selectedGroup.emails = this.selectedGroup.emails.filter(e => e !== email);
  }
}