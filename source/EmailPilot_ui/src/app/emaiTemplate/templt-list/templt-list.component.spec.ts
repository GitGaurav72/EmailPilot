import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempltListComponent } from './templt-list.component';

describe('TempltListComponent', () => {
  let component: TempltListComponent;
  let fixture: ComponentFixture<TempltListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempltListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempltListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
