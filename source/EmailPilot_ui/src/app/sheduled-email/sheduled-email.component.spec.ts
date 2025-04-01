import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduledEmailComponent } from './sheduled-email.component';

describe('SheduledEmailComponent', () => {
  let component: SheduledEmailComponent;
  let fixture: ComponentFixture<SheduledEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheduledEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheduledEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
