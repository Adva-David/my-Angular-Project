import { AuthService } from './auth.service';
import { User } from './../models/user.mode';
import { ErrorService } from './error.service';
import { share } from 'rxjs/operators';
import { Product } from './../models/product.model';
import { Cart } from './../models/cart.model';
import { BehaviorSubject, catchError, of, Subscription } from 'rxjs';
import { CartProductWithProduct } from './../models/cart-product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(undefined);

  cartSubscription: Subscription;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService
  ) {
    this.cartSubscription = this.authService.user$.subscribe((user: User) => {
      if (user && user.cart)
        this.cart$.next(this.populateCartItemPrice(user.cart));
      else this.cart$.next(null);
    });
  }
  /**
   *
   * @param cart the user's cart
   * @returns the cart with cart-products price populated
   */
  populateCartItemPrice(cart: Cart) {
    return {
      ...cart,
      items: cart.items.map((item) => ({
        ...item,
        currentPayment: item.stock * item.product.price,
      })),
    };
  }

  /**
   *
   * @param product a cart-product to be updated
   */
  updateCartProduct(product: CartProductWithProduct) {
    this.httpClient
      .put<Cart>('cart', product)
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .subscribe((value) => {
        let idx = this.cart$.value.items.findIndex(
          (item) => item.product._id === value._id
        );
        let itemsCopy = this.cart$.value.items;
        if (product.stock <= 0) {
          itemsCopy.splice(idx, 1);
        } else {
          itemsCopy[idx].stock = product.stock;
        }
        this.authService.updateUser({
          cart: { ...this.cart$.value, items: itemsCopy },
        });
      });
  }

  /**
   *
   * @param product a product to be added to user cart
   * @param stock quantity
   */
  addCartProduct(product: Product, stock: number) {
    this.httpClient
      .post<Cart>('cart', { product, cart: this.cart$.value, stock })
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .subscribe((value) => {
        this.authService.updateUser({
          cart: value,
        });
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  /**
   *
   * @returns the total price of the cart
   */
  total() {
    return this.cart$.value.items.reduce(
      (prev, next) => prev + next.currentPayment,
      0
    );
  }
}
