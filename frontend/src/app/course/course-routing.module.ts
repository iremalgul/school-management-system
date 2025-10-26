import { NgModule } from "@angular/core";
import { CourseindexComponent } from "./courseindex/courseindex.component";
import { RouterModule } from '@angular/router';
import { ExamComponent } from "./exam/exam.component";
import { ExamQuestionsComponent } from "./exam/exam-questions/exam-questions.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'index', component:CourseindexComponent },
        { path: 'exam/:courseId', component:ExamComponent },
        { path: 'exam/exam-questions/:examId', component: ExamQuestionsComponent },
        
    ])],
    exports: [RouterModule]
})
export class CourseRoutingModule{

}