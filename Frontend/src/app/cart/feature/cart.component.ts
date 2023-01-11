import {
  CartProduct,
  CartProductWithProduct,
} from './../../shared/models/cart-product.model';
import { Cart } from './../../shared/models/cart.model';
import { CartService } from './../../shared/data-access/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  /**
   * clears the user's cart
   * @param products all cart products
   */
  clearCart(products: CartProductWithProduct[]) {
    for (let prod of products) {
      prod.stock = 0;
      this.cartService.updateCartProduct(prod);
    }
  }
}
