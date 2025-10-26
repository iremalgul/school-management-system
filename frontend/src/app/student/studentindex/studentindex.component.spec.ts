import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentindexComponent } from './studentindex.component';

describe('StudentindexComponent', () => {
  let component: StudentindexComponent;
  let fixture: ComponentFixture<StudentindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
