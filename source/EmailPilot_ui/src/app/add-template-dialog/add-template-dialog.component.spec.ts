import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplateDialogComponent } from './add-template-dialog.component';

describe('AddTemplateDialogComponent', () => {
  let component: AddTemplateDialogComponent;
  let fixture: ComponentFixture<AddTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTemplateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
