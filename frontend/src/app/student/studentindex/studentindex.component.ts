import { Component } from '@angular/core';
import { StudentService } from './student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/department/departmentindex/department.service';
import { TeacherService } from 'src/app/teacher/teacherindex/teacher.service';

@Component({
  selector: 'app-studentindex',
  templateUrl: './studentindex.component.html',
  styleUrl: './studentindex.component.scss'
})
export class StudentindexComponent {
constructor(private service: StudentService, private fb: FormBuilder,private teacherService: TeacherService,private departmentService : DepartmentService) { }

  public data: any[] = [];
  teacherLookup = new Map<number, string>();
  departmentLookup = new Map<number, string>();
  isDialogOpen = false;  // Tek bir boolean
  isEditing = false;     // Insert mi, Update mi?

  studentForm: FormGroup;

  ngOnInit(): void {
    this.getAllData();
    this.loadDepartments();
    this.loadTeachers();
    this.studentForm = this.fb.group({
      id: [null],  // ID var mı yok mu kontrol ederek insert/update yapacağız
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
      password: [Validators.required]
    });
  }
  loadTeachers() {
    this.teacherService.getTeacherAll().subscribe((response: any[]) => {
      
      this.teacherLookup.clear();
      response.forEach(teacher => this.teacherLookup.set(teacher.id, teacher.name));
    });
  }

  loadDepartments() {
    this.departmentService.getDepartmentAll().subscribe((response: any[]) => {
      
      this.departmentLookup.clear();
      response.forEach(department => this.departmentLookup.set(department.id, department.name));
    });
  }
  getAllData() {
    this.service.getStudentAll().subscribe(response => {
      this.data = response as any[];
      console.log(this.data)
    });
  }


  openDialog(student = null) {
    if (student) {
      this.isEditing = true;  // Güncelleme modu
      this.studentForm.patchValue(student);
    } else {
      this.isEditing = false; // Yeni ekleme modu
      this.studentForm.reset();
    }
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.studentForm.reset();
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      // Email kontrolü: Veri listesinde aynı email var mı?
    const isEmailExists = this.data.some(student => student.email === studentData.email && student.id !== studentData.id);

    if (isEmailExists) {
      alert('This email is already registered. Please use a different email.');
      return;
    }
      
      if (this.isEditing) {
        // Güncelleme işlemi
        this.service.updateStudent(studentData).subscribe(() => {
          this.getAllData();
          this.closeDialog();
        });
      } else {
        // Yeni ekleme işlemi
        studentData.id = 0;
        this.service.insertStudent(studentData).subscribe(() => {
          this.getAllData();
          this.closeDialog();
        });
      }
    }
  }

  deleteStudent(student) {
    this.service.deleteStudent(student.id).subscribe(() => {
      this.data = this.data.filter(c => c.id !== student.id);
    });
  }
}
