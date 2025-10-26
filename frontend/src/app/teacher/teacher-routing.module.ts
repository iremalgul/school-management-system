import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherindexComponent } from './teacherindex/teacherindex.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'index', component:TeacherindexComponent },
        
    ])],
    exports: [RouterModule]
})
export class TeacherRoutingModule{

}