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
 * LoggedIn guard
 * validates a a user as already logged in
 * user is redirected to home if validation fails
 */
export class LoggedIn implements CanActivate {
  constructor(public router: Router, public authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) return true;
    this.router.navigate(['home']);
    return false;
  }
}
