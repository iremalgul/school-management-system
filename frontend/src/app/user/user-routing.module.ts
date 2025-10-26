import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserindexComponent } from './userindex/userindex.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserExamComponent } from './user-exam/user-exam.component';
import { UserGradesComponent } from './user-grades/user-grades.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'index', component:UserindexComponent },
        { path: 'dashboard', component:DashboardComponent },
        { path: 'exam/:id', component: UserExamComponent },
        { path: 'grades', component: UserGradesComponent },
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule{

}