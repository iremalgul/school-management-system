import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { DepartmentModule } from './department/department.module';
import { MenuDataService } from './layout/service/menudata.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './layout/service/auth-interceptor';
import { SignalRService } from 'src/signalR.service';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TeacherModule,
        CourseModule,
        StudentModule,
        DepartmentModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuDataService,  
        {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
