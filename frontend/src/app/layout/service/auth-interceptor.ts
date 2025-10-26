import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, exhaustMap } from "rxjs";
import { AuthService } from "src/app/demo/components/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const updatedReq = req.clone({
                    setHeaders: { email: user.email }
                })
                return next.handle(updatedReq);
            })
        )

    }
}