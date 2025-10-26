import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    constructor(private authService: AuthService, public layoutService: LayoutService, private router: Router) { }

    valCheck: string[] = ['remember'];

    password: string = "";
    email : string = "";

    login(){
        this.authService.login(this.email, this.password).subscribe(response => {
            if (response.success) {  
              this.authService.handleAuthentication(response);  
            } else {
              console.log("Login failed!");
            }
          });
    }
}
