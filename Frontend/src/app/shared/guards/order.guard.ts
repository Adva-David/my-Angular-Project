import { CartService } from './../data-access/cart.service';
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
 * Order guard
 * validates that a user can add an order (authenticated and has cart items)
 * user is redirected to home if validation fails
 */
export class OrderGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let cart = this.cartService.cart$.value;
    const canActivateRoute = cart && cart.items.length > 0;
    if (!canActivateRoute) this.router.navigate(['/cart']);
    return canActivateRoute;
  }
}
