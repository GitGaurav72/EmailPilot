import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailGroupService } from '../services/emailGroupService';

interface EmailGroup {
  mGrpId: number;
  mGrpNm: string;
  mailIds : any;
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
    // Add these new properties
    isDaily: boolean = false;
    dailyTime: string = '';
    
    userId: string | null = localStorage.getItem('userId'); // ✅ Declare userId as a class property
    emailGroups: EmailGroup[] = [];

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

  constructor(
      private emailService: EmailGroupService,
    ) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.emailService.getEmailGruoup(0,0).subscribe(
      (data: any) => {
        this.emailGroups = data.map((emailObj: any) => emailObj);
      },
      (error) => {
        console.error('Error fetching emails:', error);
        // this.snackBar.open('Failed to load emails', 'Close', { duration: 3000 });
      }
    );
  }

  getGroupName(groupId: number): string {
    return this.emailGroups.find(g => g.mGrpId === groupId)?.mGrpNm || 'Unknown Group';
  }

  getTemplateName(templateId: number): string {
    return this.emailTemplates.find(t => t.id === templateId)?.name || 'Unknown Template';
  }

  scheduleEmail() {
    if (this.selectedGroup && this.selectedTemplate) {
      // Handle daily schedule
      if (this.isDaily && this.dailyTime) {
        // Create daily schedule logic here
        const newSchedule: ScheduledEmail = {
          id: Date.now(),
          groupId: this.selectedGroup,
          templateId: this.selectedTemplate,
          datetime: this.dailyTime, // Or format as needed
          timezone: this.timezone,
          status: 'Pending'
        };
        this.scheduledEmails.push(newSchedule);
      }
      // Handle normal schedule
      else if (!this.isDaily && this.scheduledTime) {
        const newSchedule: ScheduledEmail = {
          id: Date.now(),
          groupId: this.selectedGroup,
          templateId: this.selectedTemplate,
          datetime: this.scheduledTime,
          timezone: this.timezone,
          status: 'Pending'
        };
        this.scheduledEmails.push(newSchedule);
      }
      
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
    this.isDaily = false;
    this.dailyTime = '';
    this.selectedGroup = null;
    this.selectedTemplate = null;
    this.scheduledTime = '';
    this.timezone = 'UTC';
  }
}