import { Component } from '@angular/core';
import { DepartmentService } from './department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departmentindex',
  templateUrl: './departmentindex.component.html',
  styleUrl: './departmentindex.component.scss'
})
export class DepartmentindexComponent {
constructor(private service: DepartmentService, private fb: FormBuilder) { }

  public data: any[] = [];

  isDialogOpen = false;  // Tek bir boolean
  isEditing = false;     // Insert mi, Update mi?

  departmentForm: FormGroup;

  ngOnInit(): void {
    this.getAllData();
    
    this.departmentForm = this.fb.group({
      id: [null],  // ID var mı yok mu kontrol ederek insert/update yapacağız
      name: ['', Validators.required]
    });
  }

  getAllData() {
    this.service.getDepartmentAll().subscribe(response => {
      this.data = response as any[];
    });
  }


  openDialog(department = null) {
    if (department) {
      this.isEditing = true;  // Güncelleme modu
      this.departmentForm.patchValue(department);
    } else {
      this.isEditing = false; // Yeni ekleme modu
      this.departmentForm.reset();
    }
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.departmentForm.reset();
  }

  saveDepartment() {
    if (this.departmentForm.valid) {
      const departmentData = this.departmentForm.value;
      console.log(departmentData);
      if (this.isEditing) {
        // Güncelleme işlemi
        this.service.updateDepartment(departmentData).subscribe(() => {
          this.getAllData();
          this.closeDialog();
        });
      } else {
        // Yeni ekleme işlemi
        departmentData.id = 0;
        this.service.insertDepartment(departmentData).subscribe(() => {
          this.getAllData();
          this.closeDialog();
        });
      }
    }
  }

  deleteDepartment(department) {
    this.service.deleteDepartment(department.id).subscribe(() => {
      this.data = this.data.filter(c => c.id !== department.id);
    });
  }
}
