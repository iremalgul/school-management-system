import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { TeacherService } from 'src/app/teacher/teacherindex/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/department/departmentindex/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courseindex',
  templateUrl: './courseindex.component.html',
  styleUrl: './courseindex.component.scss'
})
export class CourseindexComponent implements OnInit {

  constructor(private service: CourseService, private teacherService: TeacherService, private fb: FormBuilder, private departmentService: DepartmentService, private router: Router) { }

  public data: any[] = [];
  public filteredData: any[] = [];
  public teachers: any[] = [];
  public departments: any[] = [];
  public selectedDepartmentId: number | null = null;
  teacherLookup = new Map<number, string>();
  departmentLookup = new Map<number, string>();


  isDialogOpen = false;  // Tek bir boolean
  isEditing = false;     // Insert mi, Update mi?

  courseForm: FormGroup;

  days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  times: string[] = [];

  ngOnInit(): void {
    this.getAllData();
    this.loadTeachers();
    this.loadDepartments();
    this.populateTimeOptions();

    this.courseForm = this.fb.group({
      id: [null],  // ID var mı yok mu kontrol ederek insert/update yapacağız
      name: ['', Validators.required],
      day: ['', Validators.required],
      time: ['', Validators.required],
      teacherId: [null, Validators.required],
      departmentId: [null, Validators.required]
    });
  }
  goToExams(course) {
    this.router.navigate(['/course/exam/' + course.id]);
  }
  populateTimeOptions(): void {
    // Populate time options every hour from 08:00 to 18:00
    for (let hour = 8; hour <= 18; hour++) {
      const formattedHour = hour.toString().padStart(2, '0') + ":00";
      this.times.push(formattedHour);
    }
  }

  getAllData() {
    this.service.getCourseAll().subscribe(response => {
      this.data = response as any[];
      this.filteredData = [...this.data];
      console.log(this.data)
    });
  }

  loadTeachers() {
    this.teacherService.getTeacherAll().subscribe((response: any[]) => {
      this.teachers = response;
      this.teacherLookup.clear();
      response.forEach(teacher => this.teacherLookup.set(teacher.id, teacher.name));
    });
  }

  loadDepartments() {
    this.departmentService.getDepartmentAll().subscribe((response: any[]) => {
      this.departments = response;
      this.departmentLookup.clear();
      response.forEach(department => this.departmentLookup.set(department.id, department.name));
    });
  }

  openDialog(course = null) {
    if (course) {
      this.isEditing = true;  // Güncelleme modu
      this.courseForm.patchValue(course);
    } else {
      this.isEditing = false; // Yeni ekleme modu
      this.courseForm.reset();
    }
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.courseForm.reset();
  }

  saveCourse() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      console.log(courseData);
      if (this.isEditing) {
        // Güncelleme işlemi
        this.service.updateCourse(courseData).subscribe(() => {
          this.getAllData();
          this.closeDialog();
        });
      } else {
        // Yeni ekleme işlemi
        courseData.id = 0;
        this.service.insertCourse(courseData).subscribe(() => {
          this.getAllData();
          this.closeDialog();
        });
      }
    }
  }

  deleteCourse(course) {
    this.service.deleteCourse(course.id).subscribe(() => {
      this.data = this.data.filter(c => c.id !== course.id);
      this.filteredData = [...this.data];
    });
  }

  onDepartmentFilter() {
    if (this.selectedDepartmentId === null) {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter(course => course.departmentId === this.selectedDepartmentId);
    }
  }

  clearFilter() {
    this.selectedDepartmentId = null;
    this.filteredData = [...this.data];
  }
}
