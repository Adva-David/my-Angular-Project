import { Cart } from './../../../shared/models/cart.model';
import { AuthService } from './../../../shared/data-access/auth.service';
import { Order } from './../../../shared/models/order.model';
import { CartService } from './../../../shared/data-access/cart.service';
import { OrderService } from './../../../shared/data-access/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  query: string = '';
  private cart: Cart;
  constructor(
    public orderService: OrderService,
    public cartService: CartService,
    public authService: AuthService
  ) {
    this.cart = cartService.cart$.value;
    this.authService.userCompleteOrder();
  }

  ngOnDestroy(): void {
    //clean last order info
    this.orderService.completedOrder$.next(undefined);
  }

  /**
   * changes the query of the order-summary product-search
   * @param e input event
   */
  queryItems(e: any) {
    const val = e.target.value;
    this.query = val.toLowerCase();
  }

  ngOnInit(): void {}

  /**
   *
   * @param date date object
   * @returns date as a parsed string
   */
  toDateString(date: any) {
    return new Date(date).toDateString();
  }

  /**
   * downloads a CSV file withe the order's information
   */
  downloadReceipt() {
    let csvContent = 'data:text/csv;charset=utf-8,';

    this.cart.items.forEach(function (item) {
      let row = JSON.stringify({
        productName: item.product.productName,
        price: item.product.price,
        category: item.product.category,
      });
      csvContent += row + '\r\n'; // add carriage return
    });
    var link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute(
      'download',
      new Date().toDateString() +
        '_' +
        this.authService.user$.value.email +
        '.txt'
    );
    document.body.appendChild(link);
    link.click();
  }

  /**
   * parses an order object into a CSV format
   */
  JSON2CSV(order: Order) {
    let keys = Object.keys(order);
    let strKeys = keys.reduce((prev, next) => prev + '\t' + next, '');
    let values = Object.values(order);
    let strValues = values.reduce((prev, next) => prev + '\t' + next, '');
    return strKeys + '\r\n' + strValues;
  }
}
