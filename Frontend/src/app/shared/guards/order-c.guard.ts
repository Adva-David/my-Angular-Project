import { OrderService } from './../data-access/order.service';
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
 * OrderC guard
 * validates that a user posses an order
 * user is redirected to home if validation fails
 */
export class OrderCGuard implements CanActivate {
  constructor(private orderService: OrderService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.orderService.completedOrder$.value) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
