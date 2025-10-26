import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherindexComponent } from './teacherindex/teacherindex.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TeacherindexComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class TeacherModule { }
