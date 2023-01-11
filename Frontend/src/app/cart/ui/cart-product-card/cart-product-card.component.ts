import { CartService } from './../../../shared/data-access/cart.service';
import { Product } from './../../../shared/models/product.model';
import {
  CartProduct,
  CartProductWithProduct,
} from './../../../shared/models/cart-product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss'],
})
export class CartProductCardComponent implements OnInit {
  @Input('product') product: CartProductWithProduct;
  @Input('isOrder') isOrder: boolean;
  @Input('query') query: string = null;
  constructor(private cartService: CartService) {}

  isQueried() {
    return this.query && this.product.product.productName.includes(this.query);
  }

  removeCartProduct() {
    this.product.stock = 0;
    this.cartService.updateCartProduct(this.product);
  }
  increaseCartProductAmt() {
    this.product.stock++;
    this.cartService.updateCartProduct(this.product);
  }
  decreaseCartProductAmt() {
    this.product.stock--;
    this.cartService.updateCartProduct(this.product);
  }
  ngOnInit(): void {}
}
