import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseindexComponent } from './courseindex.component';

describe('CourseindexComponent', () => {
  let component: CourseindexComponent;
  let fixture: ComponentFixture<CourseindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
