import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentindexComponent } from './departmentindex/departmentindex.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'index', component:DepartmentindexComponent },
        
    ])],
    exports: [RouterModule]
})
export class DepartmentRoutingModule{

}