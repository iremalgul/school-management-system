import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacherindex',
  templateUrl: './teacherindex.component.html',
  styleUrl: './teacherindex.component.scss'
})
export class TeacherindexComponent implements OnInit {
  constructor(private service: TeacherService, private fb: FormBuilder) { }

  public data: any[] = [];
  isUpdate = false;
  isInsert = false;
  public selectedTeacher: any = null;
  
  teacherForm: FormGroup;

  ngOnInit(): void {
    this.getAllData();
    this.initializeForm();
  }

  initializeForm() {
    this.teacherForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''] // Password optional for updates
    });
  }

  openInsertDialog() {
    this.isInsert = true;
    this.teacherForm.reset();
    this.teacherForm.enable();
  }

  closeInsertDialog() {
    this.isInsert = false;
    this.teacherForm.reset();
  }

  getAllData() {
    this.service.getTeacherAll().subscribe({
      next: (response) => {
        this.data = response as any[];
        console.log('Teacher data loaded:', this.data);
      },
      error: (error) => {
        console.error('Error loading teacher data:', error);
        this.data = [];
      }
    });
  }
  
  openUpdateDialog(teacher) {
    this.isUpdate = true;
    this.selectedTeacher = teacher;
    this.teacherForm.patchValue({
      name: teacher.name || '',
      email: teacher.email || '',
      password: '' // Password alanını boş bırak
    });
    
    // Form'u enable et
    this.teacherForm.enable();
  }

  saveTeacher() {
    // Form validation - sadece name ve email kontrol et
    if (!this.teacherForm.value.name || !this.teacherForm.value.email) {
      alert('Please fill in name and email fields.');
      return;
    }

    let model: any = {
      name: this.teacherForm.value.name.trim(),
      email: this.teacherForm.value.email.trim(),
      id: this.selectedTeacher.id,
      password: this.teacherForm.value.password || this.selectedTeacher.password // Mevcut password'u kullan
    };
    
    console.log('Updating teacher with model:', model);
    
    // Email kontrolü: Veri listesinde aynı email var mı?
    const isEmailExists = this.data.some(teacher => teacher.email === model.email && teacher.id !== model.id );

    if (isEmailExists) {
      alert('This email is already registered. Please use a different email.');
      return;
    }

    this.service.updateTeacher(model).subscribe({
      next: (response) => {
        console.log('Teacher update response:', response);
        if (response) {
          this.getAllData();
          this.isUpdate = false;
          this.teacherForm.reset();
        }
      },
      error: (error) => {
        console.error('Error updating teacher:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        
        if (error.status === 400) {
          alert('Bad Request: Please check if all fields are filled correctly and the email format is valid.');
        } else if (error.status === 500) {
          alert('Server Error: Please try again later.');
        } else {
          alert(`Error updating teacher: ${error.message || 'Please check console for details'}`);
        }
      }
    });
  }

  deleteTeacher(teacher){
    this.selectedTeacher = teacher;
    this.service.deleteTeacher(this.selectedTeacher.id).subscribe({
      next: (response) => {
        if (response) {
          this.getAllData();
        }
      },
      error: (error) => {
        console.error('Error deleting teacher:', error);
        alert('Error deleting teacher. Please try again.');
      }
    });
  }

  insertTeacher(){
    // Password required for new teacher
    if (!this.teacherForm.value.password || this.teacherForm.value.password.trim() === '') {
      alert('Password is required for new teacher.');
      return;
    }
    
    let model = {
      name: this.teacherForm.value.name.trim(),
      email: this.teacherForm.value.email.trim(),
      password: this.teacherForm.value.password.trim(),
    };
      
      console.log('Inserting teacher with model:', model);
      
      // Email kontrolü: Veri listesinde aynı email var mı?
      const isEmailExists = this.data.some(teacher => teacher.email === model.email );

      if (isEmailExists) {
        alert('This email is already registered. Please use a different email.');
        return;
      }

      this.service.insertTeacher(model).subscribe({
        next: (response) => {
          console.log('Teacher insert response:', response);
        if (response > 0) {
          this.getAllData();
          this.closeInsertDialog();
        } else {
          alert('Failed to create teacher. Please try again.');
        }
        },
        error: (error) => {
          console.error('Error inserting teacher:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error body:', error.error);
          
          if (error.status === 400) {
            alert('Bad Request: Please check if all fields are filled correctly and the email format is valid.');
          } else if (error.status === 500) {
            alert('Server Error: Please try again later.');
          } else {
            alert(`Error creating teacher: ${error.message || 'Please check console for details'}`);
          }
        }
      });
  }



}
