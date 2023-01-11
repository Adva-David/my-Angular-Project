import {
  ModalService,
  ModalType,
} from './../../../shared/data-access/modal.service';
import { AuthService } from './../../../shared/data-access/auth.service';
import { OrderService } from './../../../shared/data-access/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    public authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders();
  }
  toDateString(date: any) {
    return new Date(date).toDateString();
  }

  showOrderCart(order: Order) {
    this.orderService.getOrderCart(order._id, (cart) => {
      this.modalService.openModal(cart, ModalType.ShowOrderCart);
    });
  }
}
