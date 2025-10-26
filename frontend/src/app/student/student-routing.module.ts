import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { StudentindexComponent } from "./studentindex/studentindex.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'index', component:StudentindexComponent },
        
    ])],
    exports: [RouterModule]
})
export class StudentRoutingModule{

}