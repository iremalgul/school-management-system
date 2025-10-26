import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseindexComponent } from './courseindex/courseindex.component';
import { CourseRoutingModule } from './course-routing.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ExamComponent } from './exam/exam.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ExamQuestionsComponent } from './exam/exam-questions/exam-questions.component';



@NgModule({
  declarations: [ 
    CourseindexComponent,
    ExamComponent,
    ExamQuestionsComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    ToolbarModule,
]
})
export class CourseModule { }
