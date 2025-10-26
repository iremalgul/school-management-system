import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "src/app/demo/components/auth/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
 constructor(private authService : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.authService.autoLogin();
        return this.authService.user.pipe(
            map(user => {
                return !!user;
            }),
            tap(isAuth => {
                if(!isAuth){
                    this.router.navigate(['auth/login']);
                }
            })
        );
    }



 
}