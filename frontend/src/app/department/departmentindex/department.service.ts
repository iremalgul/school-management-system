import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {

    constructor(private http: HttpClient) { }

    getDepartmentAll(): Observable<any> {
        return this.http.get("https://localhost:7123/api/department/getall");
    }
    updateDepartment(model: any): Observable<any> {
        return this.http.post("https://localhost:7123/api/department/updateDepartment", model);
    }

    deleteDepartment(id: number): Observable<any> {
        return this.http.post(`https://localhost:7123/api/department/deleteDepartment?departmentId=${id}`, {});
    }

    insertDepartment(model: any):  Observable<any> {
        return this.http.post("https://localhost:7123/api/department/insertDepartment", model)
    }

    getDepartment(id: number): Observable<any> {
        return this.http.get(`https://localhost:7123/api/department/getbyId?departmentId=${id}`);
    }
}