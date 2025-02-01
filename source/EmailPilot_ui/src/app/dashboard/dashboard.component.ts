import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface EmailGroup {
  id: number;
  name: string;
}

interface EmailTemplate {
  id: number;
  name: string;
}

interface ScheduledEmail {
  id: number;
  groupId: number;
  templateId: number;
  datetime: string;
  timezone: string;
  status: 'Pending' | 'Sent' | 'Failed';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  emailGroups: EmailGroup[] = [
    { id: 1, name: 'Marketing Team' },
    { id: 2, name: 'Support Team' }
  ];

  emailTemplates: EmailTemplate[] = [
    { id: 1, name: 'Welcome Email' },
    { id: 2, name: 'Promotional Offer' }
  ];

  scheduledEmails: ScheduledEmail[] = [
    {
      id: 1,
      groupId: 1,
      templateId: 1,
      datetime: '2023-12-25T09:00',
      timezone: 'UTC',
      status: 'Pending'
    }
  ];

  selectedGroup: number | null = null;
  selectedTemplate: number | null = null;
  scheduledTime: string = '';
  timezone: string = 'UTC';

  getGroupName(groupId: number): string {
    return this.emailGroups.find(g => g.id === groupId)?.name || 'Unknown Group';
  }

  getTemplateName(templateId: number): string {
    return this.emailTemplates.find(t => t.id === templateId)?.name || 'Unknown Template';
  }

  scheduleEmail() {
    if (this.selectedGroup && this.selectedTemplate && this.scheduledTime) {
      const newSchedule: ScheduledEmail = {
        id: Date.now(),
        groupId: this.selectedGroup,
        templateId: this.selectedTemplate,
        datetime: this.scheduledTime,
        timezone: this.timezone,
        status: 'Pending'
      };
      this.scheduledEmails.push(newSchedule);
      this.resetForm();
    }
  }

  editSchedule(scheduled: ScheduledEmail) {
    // Implement edit logic
    console.log('Edit schedule:', scheduled);
  }

  deleteSchedule(id: number) {
    this.scheduledEmails = this.scheduledEmails.filter(s => s.id !== id);
  }

  private resetForm() {
    this.selectedGroup = null;
    this.selectedTemplate = null;
    this.scheduledTime = '';
    this.timezone = 'UTC';
  }
}