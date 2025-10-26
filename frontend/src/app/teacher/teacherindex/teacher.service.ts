import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TeacherService {

    constructor(private http: HttpClient) { }

    getTeacherAll(): Observable<any> {
        return this.http.get("https://localhost:7123/api/teacher/getall");
    }
    updateTeacher(model: any): Observable<any> {
        return this.http.post("https://localhost:7123/api/teacher/updateTeacher", model);
    }

    deleteTeacher(id: number): Observable<any> {
        return this.http.post(`https://localhost:7123/api/teacher/deleteTeacher?teacherId=${id}`, {});
    }

    insertTeacher(model: any): Observable<any> {
        return this.http.post("https://localhost:7123/api/teacher/insertTeacher", model, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getTeacher(id: number): Observable<any> {
        return this.http.get(`https://localhost:7123/api/teacher/getbyId?teacherId=${id}`);
    }
}