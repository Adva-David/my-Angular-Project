import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class ClientRequestsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({
      url: `http://localhost:5001/api/${httpRequest.url}`,
    });

    const token = this.authService.getToken();
    if (token)
      httpRequest = httpRequest.clone({
        headers: httpRequest.headers.append('authorization', `Bearer ${token}`),
      });
    return next.handle(httpRequest);
  }
}
