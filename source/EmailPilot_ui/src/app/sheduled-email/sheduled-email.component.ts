import { Component, OnInit } from '@angular/core';
import { SheduledEmailService } from '../services/sheduledEmailService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { EmailGroupService } from '../services/emailGroupService';
import { TemplateService } from '../services/templateService';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sheduled-email',
  standalone: true,
  imports: [RouterModule,
      CommonModule, 
      MatTableModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatButtonModule,
      MatIconModule],
  templateUrl: './sheduled-email.component.html',
  styleUrl: './sheduled-email.component.css'
})
export class SheduledEmailComponent {
  sheduledEmails: any[] = [];
  currentPage = 1;
  itemsPerPage = 30;
  totalEmails = 0;
  emailGroup : any;
  emailTemplate : any;
  userId: string | null = localStorage.getItem('userId');
  constructor(private sheduledEmailService: SheduledEmailService, private snackBar: MatSnackBar, private emailGroupservice :EmailGroupService, private templateService : TemplateService) {}


  ngOnInit(): void {
    this.loadEmails();
  }
  
  loadEmails(): void {
    this.sheduledEmailService.getSheduleEmailList(this.currentPage, this.itemsPerPage, this.userId ?? '')
      .subscribe((data: any) => {
        this.sheduledEmails = data.data;
  
        this.sheduledEmails.forEach(email => {
          this.getGroupName(email.grpId).then(groupName => email.groupName = groupName);
          this.getTemplateName(email.emailTemp).then(templateName => email.templateName = templateName);
        });
      });
  }
  
  async getGroupName(id: string): Promise<string> {
    try {
      const data: any = await this.emailGroupservice.getEmailGruoupId(id).toPromise();
      return data?.mGrpNm || 'Unknown Group';
    } catch (error) {
      console.error('Error fetching group name:', error);
      return 'Error fetching group';
    }
  }
  
  async getTemplateName(id: string): Promise<string> {
    try {
      const data: any = await this.templateService.getTemplateById(id).toPromise();
      return data?.title || 'Unknown Template';
    } catch (error) {
      console.error('Error fetching template name:', error);
      return 'Error fetching template';
    }
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEmails();
  }

  editEmail(email: any) {
    console.log('Edit Email:', email);
    // Your logic to open edit dialog or form
  }
  
  viewEmail(email: any) {
    console.log('View Email:', email);
    // Your logic to open view dialog or details
  }
  
  deleteEmail(id: string) {
    if (confirm('Are you sure you want to delete this email?')) {
      console.log('Deleting Email ID:', id);
      // Your delete API call logic here
    }
  }
  

}
