import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    constructor(private http: HttpClient) { }
    getCourseAll(): Observable<any> {
        return this.http.get("https://localhost:7123/api/course/getAll");
    }
    GetAllForStudent(): Observable<any> {
        return this.http.get("https://localhost:7123/api/course/GetAllForStudent");
    }
    updateCourse(model: any): Observable<any> {
        return this.http.post("https://localhost:7123/api/course/updateCourse", model);
    }

    deleteCourse(id: number): Observable<any> {
        return this.http.post(`https://localhost:7123/api/course/deleteCourse?courseId=${id}`, {});
    }

    insertCourse(model: any):  Observable<any> {
        return this.http.post("https://localhost:7123/api/course/insertCourse", model)
    }

    takeCourse(model: any):  Observable<any> {
        return this.http.post("https://localhost:7123/api/course/takeCourse", model)
    }
    getStudentCourses(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7123/api/course/GetStudentCourses`);
}

}