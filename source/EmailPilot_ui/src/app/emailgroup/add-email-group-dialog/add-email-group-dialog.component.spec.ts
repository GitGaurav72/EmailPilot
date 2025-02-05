import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailGroupDialogComponent } from './add-email-group-dialog.component';

describe('AddEmailGroupDialogComponent', () => {
  let component: AddEmailGroupDialogComponent;
  let fixture: ComponentFixture<AddEmailGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmailGroupDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmailGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
