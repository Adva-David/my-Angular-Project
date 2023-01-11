import { AuthService } from './../data-access/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth guard
 * validates an authenticated user 
 * user is redirected to home if authentication fails
 */
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) return true;
    this.router.navigate(['auth']);
    return false;
  }
}
