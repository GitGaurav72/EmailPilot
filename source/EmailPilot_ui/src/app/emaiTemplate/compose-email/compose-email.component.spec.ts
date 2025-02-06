import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeEmailComponent } from './compose-email.component';

describe('ComposeEmailComponent', () => {
  let component: ComposeEmailComponent;
  let fixture: ComponentFixture<ComposeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposeEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComposeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
