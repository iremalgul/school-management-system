import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "src/app/demo/components/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    
    this.authService.autoLogin(); // LocalStorage'dan kullanıcıyı çek

    return this.authService.user.pipe(
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['auth/login']);
        }
        if (!user.isAdmin) {
          return this.router.createUrlTree(['/user']);
        }
        return true; // admin
      })
    );
  }
}
