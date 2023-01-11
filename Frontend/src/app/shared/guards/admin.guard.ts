import { AuthService } from './../data-access/auth.service';
import { ModalService, AlertType } from './../data-access/modal.service';
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
 * Admin guard
 * validates a logged in user as admin
 * user is redirected to home if validation fails
 */
export class AdminGuard implements CanActivate {
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router : Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.authService.user$.subscribe((user) => {
        if (user === undefined) {
          return;
        }
        let e_msg = 'Only admin users can access this page';
        if (user && !user.admin) {
          this.modalService.openAlert(e_msg, AlertType.Error);
          resolve(false);
          this.router.navigate(['/home'])
        } else resolve(true);
      });
    });
  }
}
