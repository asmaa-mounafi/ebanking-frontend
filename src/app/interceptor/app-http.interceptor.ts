import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes("/auth/login")) {
      if (this.authService.accessToken) {
        let req = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${this.authService.accessToken}`)
        })
        return next.handle(req).pipe(
          catchError(err => {
            if (err.status == 401)
              this.authService.logout()
            return throwError(err.message)
          })
        )
      } else {
        // Handle the case where the accessToken is null or undefined
        return next.handle(request)
      }
    } else {
      return next.handle(request)
    }
  }
}


