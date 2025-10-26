import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserindexComponent } from './userindex/userindex.component';
import { UserRoutingModule } from './user-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { UserExamComponent } from './user-exam/user-exam.component';
import { UserGradesComponent } from './user-grades/user-grades.component';



@NgModule({
  declarations: [
    UserindexComponent,
    DashboardComponent,
    UserExamComponent,
    UserGradesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    PanelModule,
    ToastModule
  ]
})
export class UserModule { }
