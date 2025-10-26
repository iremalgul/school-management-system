import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuDataService {

    constructor(private http: HttpClient) { }

    getTeacherMenu() {
        return this.http.get<any>('assets/demo/data/teachermenu.json')
    }
    getUserMenu() {
        return this.http.get<any>('assets/demo/data/usermenu.json')
    }
}
