import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "./user.model";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
    user = new BehaviorSubject<UserModel | null>(null);
    private apiUrl = "https://localhost:7123/api/auth/login"; 

    constructor(private http: HttpClient, private router: Router) {
        this.autoLogin(); // Auto-login on app startup
    }

    login(email: string, password: string) {
        return this.http.post<UserModel>(this.apiUrl, { email, password }).pipe(
            tap(user => {
                console.log('User response from API:', user); // Debug API response
                if (user.success) {
                    this.handleAuthentication(user);
                    
                    // Redirect based on isAdmin flag
                    if (user.isAdmin) {
                        this.router.navigate(['']);  // Redirect to teacher dashboard (admin)
                    } else {
                        this.router.navigate(['user/dashboard']);  // Redirect to student dashboard
                    }
                } else {
                    console.log("Login failed!");
                }
            })
        );
    }
    

    logout() {
        localStorage.removeItem("user");
        this.user.next(null);
        this.router.navigate(['auth/login']); 
    }

    handleAuthentication(user: UserModel) {
        this.user.next(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    

    autoLogin() {
        const storedUserData = localStorage.getItem("user");
        if (!storedUserData) {
            return;
        }
        const user: UserModel = JSON.parse(storedUserData);
        this.user.next(user);
    }
}
