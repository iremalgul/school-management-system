import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthAdminGuard } from 'src/guards/auth-admin.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthAdminGuard],  // Protect routes with AuthGuard
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
                    { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
                    { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule) },
                    { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'user', canActivate: [AuthGuard], component: AppLayoutComponent, loadChildren: () => import('./user/user.module').then(m => m.UserModule) },  // Regular user path
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

