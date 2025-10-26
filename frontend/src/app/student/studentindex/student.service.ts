import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    constructor(private http: HttpClient) { }
    getStudentAll(): Observable<any> {
        return this.http.get("https://localhost:7123/api/student/getAll");
    }
    updateStudent(model: any): Observable<any> {
        return this.http.post("https://localhost:7123/api/student/updateStudent", model);
    }

    deleteStudent(id: number): Observable<any> {
        return this.http.post(`https://localhost:7123/api/student/deleteStudent?studentId=${id}`, {});
    }

    insertStudent(model: any):  Observable<any> {
        return this.http.post("https://localhost:7123/api/student/insertStudent", model)
    }

}