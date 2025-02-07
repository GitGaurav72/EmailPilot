import { Component, OnInit } from '@angular/core';
import { EmailGroupService } from '../../services/emailGroupService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { AesDecryptService } from '../../services/aes.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateService } from '../../services/templateService';
import { AddTemplateDialogComponent } from '../../add-template-dialog/add-template-dialog.component';

@Component({
  selector: 'app-templt-list',
  standalone: true,
  imports: [
    RouterModule,
      CommonModule, 
      MatTableModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatButtonModule
  ],
  templateUrl: './templt-list.component.html',
  styleUrl: './templt-list.component.css'
})
export class TempltListComponent implements OnInit{
  templateGrp: any[] = [];
  currentPage = 1;
  itemsPerPage = 30;
  totalEmails = 0;
  userId: string | null = localStorage.getItem('userId'); // ✅ Declare userId as a class property
  constructor(
    private templateService: TemplateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTemplate();
  }

  loadTemplate(): void {
    this.templateService.getTemplateList(this.currentPage, this.itemsPerPage, this.userId ?? '').subscribe(
      (data: any) => {
        this.templateGrp = data;
        this.totalEmails = data.total;
      },
      (error) => {
        console.error('Error fetching emails:', error);
        this.snackBar.open('Failed to load emails', 'Close', { duration: 3000 });
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadTemplate();
  }

  // openAddEmailGroupDialog(): void {
  //   const dialogRef = this.dialog.open(AddEmailGroupDialogComponent, {
  //     width: '400px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.saveEmailGroup(result);
  //     }
  //   });
  // }

  openAddTemplateDialog(): void {
    const dialogRef = this.dialog.open(AddTemplateDialogComponent, {
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveTemplate(result);
      }
    });
  }
  
  saveTemplate(data: any): void {
    // Call your service to save the template
    data.title  = data.title;
    data.subject  = data.subject;
    data.cc  = data.cc;
    data.bcc = data.bcc;
    data.mlCntnt = data.body;
    data.addByUser =  this.userId;
    data.addTm = new Date().toISOString();
    data.uptTm= new Date().toISOString();
    this.templateService.addTemplate(data).subscribe(
      (response) => {
        this.snackBar.open('Template added successfully', 'Close', { duration: 3000 });
        this.loadTemplate(); // Refresh the list
      },
      (error) => {
        console.error('Error saving template:', error);
        this.snackBar.open('Failed to add template', 'Close', { duration: 3000 });
      }
    );
  }
}
