import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailGroupService } from '../services/emailGroupService';
import { MailContent } from '../interfaces';
import { TemplateService } from '../services/templateService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduledEmail } from '../interfaces';
import { DashboardService } from '../services/dashboardService';

interface EmailGroup {
  mGrpId: string;
  mGrpNm: string;
  mailIds : any;
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
    // emailTemplates: MailContent[] = [];
    emailTemplates: any[] = [];
  scheduledEmails: ScheduledEmail[] = [
    {
      id: '1',
      grpId: '1',
      userId: "o29d8991h-9u91u29qd-2hd9wq0002i",
      emailTemp: '1',
      scheduledTime: '2023-12-25T09:00',
      timeZone: 'UTC',
      crtTm : '2023-12-25T09:00',
      uptTm :  '2023-12-25T09:00',
      scheduleDaily : 'N',
      scheduleDailyTime : ''
    }
  ];

  selectedGroup: string | null = null;
  selectedTemplate: string | null = null;
  scheduledTime: string = '';
  timezone: string = 'UTC';
  status: string = 'PENDING';
  constructor(
      private emailService: EmailGroupService, private templateService : TemplateService, private snackBar: MatSnackBar, private dashboardService :DashboardService
    ) {}

  ngOnInit(): void {
    this.loadEmails();
    this.loadTemplate();
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

  loadTemplate(): void {
    this.templateService.getTemplateList(0, 0).subscribe(
      (data: any) => {
        this.emailTemplates= data;
        console.log(this.emailTemplates);
      },
      (error) => {
        console.error('Error fetching emails:', error);
        this.snackBar.open('Failed to load emails', 'Close', { duration: 3000 });
      }
    );
  }
  
  getGroupName(groupId: string): string {
    return this.emailGroups.find(g => g.mGrpId === groupId)?.mGrpNm || 'Unknown Group';
  }

  getTemplateName(templateId: string): string {
    if (!this.emailTemplates || this.emailTemplates.length === 0) {
      return 'Unknown Template'; // Return default if not yet loaded
    }
    return this.emailTemplates.find(t => t.mlCntntId === templateId)?.title || 'Unknown Template';
  }
  

  scheduleEmail() {
    if (this.selectedGroup && this.selectedTemplate) {
      // Handle daily schedule
      if (this.isDaily && this.dailyTime) {
        // Create daily schedule logic here
        const newSchedule: ScheduledEmail = {
         
          id: '',
          userId: this.userId ?? '',
          grpId: this.selectedGroup,
          emailTemp: this.selectedTemplate,
          scheduleDailyTime : this.dailyTime,
          scheduledTime : '', // Or format as needed
          timeZone: this.timezone,
          scheduleDaily: '',
          crtTm: new Date().toISOString(), // ISO string format for timestamps
          uptTm: new Date().toISOString()
          
        };
        this.scheduledEmails.push(newSchedule);
      }
      // Handle normal schedule
      else if (!this.isDaily && this.scheduledTime) {
        const newSchedule: ScheduledEmail = {
         
          id: '',
          userId: this.userId ?? '',
          grpId: this.selectedGroup,
          emailTemp: this.selectedTemplate,
          scheduledTime: this.scheduledTime,
          scheduleDailyTime : '',
          timeZone: this.timezone,
          scheduleDaily: 'Y',
          crtTm: new Date().toISOString(), // ISO string format for timestamps
          uptTm: new Date().toISOString()
        };
        this.scheduledEmails.push(newSchedule);
      }

      this.dashboardService.AddSheduleEmail(this.scheduledEmails[1]).subscribe(
        (response) => {
          this.snackBar.open('Template added successfully', 'Close', { duration: 3000 });
              // Refresh the list
        },
        (error) => {
          console.error('Error saving template:', error);
          this.snackBar.open('Failed to add template', 'Close', { duration: 3000 });
        }
      );
      
      this.resetForm();
    }
  }

  editSchedule(scheduled: ScheduledEmail) {
    // Implement edit logic
    console.log('Edit schedule:', scheduled);
  }

  deleteSchedule(id: string) {
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