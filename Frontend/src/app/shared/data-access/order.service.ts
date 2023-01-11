import { OrderWithCart } from './../models/order.model';
import { share, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import {
  Subscription,
  BehaviorSubject,
  Observable,
  pipe,
  catchError,
  of,
} from 'rxjs';
import { CartService } from './cart.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Order, OrderWithCartComplete } from '../models/order.model';
import { CartComplete } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnDestroy {
  cartSubscription: Subscription;
  completedOrder$: BehaviorSubject<OrderWithCartComplete> = new BehaviorSubject(
    undefined
  );
  viewingOrder$: BehaviorSubject<OrderWithCartComplete> = new BehaviorSubject(
    undefined
  );
  ordersHistory$: BehaviorSubject<Order[]> = new BehaviorSubject(undefined);
  constructor(
    public cartService: CartService,
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      if (!cart) {
        this.completedOrder$.next(null);
        this.viewingOrder$.next(null);
        this.ordersHistory$.next(null);
      }
    });
    this.getOrders();
  }

  /**
   * creates a new order
   * @param order a new order to be submitted
   */
  createOrder(order: Order) {
    let sub = this.httpClient
      .post<Order>('orders', order)
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .subscribe((value) => {
        this.completedOrder$.next(value);
        if (value) this.getOrder(value._id);
        sub.unsubscribe();
      });
  }
  /**
   * subscribes to user orders
   */
  getOrders() {
    let sub = this.httpClient
      .get<Order[]>('orders/all')
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .subscribe((value) => {
        this.ordersHistory$.next(value);
        sub.unsubscribe();
      });
  }

  /**
   *
   * @param orderId a specific order id
   * @param callback a callback consuming the cart of a previous order by id
   */
  getOrderCart(orderId: string, callback: (cart: CartComplete) => void) {
    let sub = this.httpClient
      .get<CartComplete>(`orders/cart/${orderId}`)
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .subscribe((value) => {
        callback(value);
        sub.unsubscribe();
      });
  }

  /**
   * fetches order information with id
   * @param orderId an order id
   */
  getOrder(orderId: string) {
    let sub = this.httpClient
      .get<OrderWithCart>(`orders/${orderId}`)
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .subscribe((value) => {
        this.viewingOrder$.next(value);
        sub.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
