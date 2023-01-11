import {
  ModalService,
  AlertType,
} from './../../shared/data-access/modal.service';
import { OrderService } from './../../shared/data-access/order.service';
import { AuthService } from './../../shared/data-access/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from './../../shared/data-access/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isValidForm } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm = new FormGroup({
    credit_card: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{16}$/),
    ]),
    expiration: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{2}\/[0-9]{2}$/),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{3}$/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]),
    street: new FormControl('', [Validators.required]),
    delivery_date: new FormControl('', [Validators.required]),
    delivery_time: new FormControl('', [Validators.required]),
  });
  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.orderService.completedOrder$.subscribe((order) => {
      if (order) {
        this.router.navigate(['/order-summary']);
      }
    });
  }

  /**
   *
   * @returns the current date as a beautified string
   */
  currentDate() {
    let d = new Date();
    const month = ('0' + d.getMonth() + 1).slice(-2);

    return d.getFullYear() + '-' + month + '-' + d.getDate();
  }

  /**
   *
   * @returns the maximum valid delivery date accepted by the app
   */
  maxDeliveryDate() {
    let d = new Date();
    d.setTime(d.getTime() + 31 * 24 * 60 * 60 * 1000); // 31 days * 24 hours * 60 min * 60sec * 1000 ms
    const month = ('0' + d.getMonth() + 1).slice(-2);
    const dateString = d.getFullYear() + '-' + month + '-' + d.getDate();
    return dateString;
  }
  ngOnInit(): void {}

  /**
   * validates order form
   * and submits a new order
   */
  submitOrder() {
    if (!isValidForm(this.orderForm, this.modalService)) {
      return;
    }
    // we need a form for this
    // attach the orderFormGroup
    const deliveryCity = this.orderForm.value.city;
    const deliveryStreet = this.orderForm.value.street;
    const deliveryDate = new Date(this.orderForm.value.delivery_date);
    const today = new Date().getTime();
    if (
      deliveryDate.getTime() < today ||
      Math.abs(deliveryDate.getTime() - today) < 1000 * 60 * 60 * 24
    ) {
      this.modalService.openAlert(
        'Please select a date later then tomorrow',
        AlertType.Error
      );
      return;
    }

    const time = this.orderForm.value.delivery_time;
    const h = time.split(':')[0];
    const m = time.split(':')[1];
    deliveryDate.setHours(parseInt(h));
    deliveryDate.setMinutes(parseInt(m));
    const orderDate = new Date();
    const totalPrice = this.cartService.total();
    const cart = this.cartService.cart$.value._id;
    const user = this.authService.user$.value._id;
    this.orderService.createOrder({
      deliveryCity,
      deliveryDate,
      deliveryStreet,
      orderDate,
      totalPrice,
      cart,
      user,
    });
  }
}
