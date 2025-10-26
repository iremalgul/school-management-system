import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherindexComponent } from './teacherindex.component';

describe('TeacherindexComponent', () => {
  let component: TeacherindexComponent;
  let fixture: ComponentFixture<TeacherindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
