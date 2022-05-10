import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      mergeMap(user => {
        if(!user) {
          return next.handle(req);
        } else {
          const modifiedReq = req.clone({
            setParams: {
              auth: user.token
            }
          })
          return next.handle(modifiedReq);
        }
      })
    )
  }
}