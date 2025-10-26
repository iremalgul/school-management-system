import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentindexComponent } from './departmentindex.component';

describe('DepartmentindexComponent', () => {
  let component: DepartmentindexComponent;
  let fixture: ComponentFixture<DepartmentindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
