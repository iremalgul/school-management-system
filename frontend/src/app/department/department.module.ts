import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentindexComponent } from './departmentindex/departmentindex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DepartmentRoutingModule } from './department-routing.module';



@NgModule({
  declarations: [
    DepartmentindexComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepartmentModule { }
