import { ModalService } from './../../../shared/data-access/modal.service';
import { CartService } from './../../../shared/data-access/cart.service';
import { Product } from '../../../shared/models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss'],
})
export class AddProductCartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private modalService: ModalService
  ) {}

  amount: number = 1;

  @Input('product')
  public product: Product;

  ngOnInit(): void {}

  /**
   * remove from cart product quantity
   */
  onClickMinusProduct() {
    const new_amount = Math.max(1, this.amount - 1);
    this.amount = new_amount;
  }
  /**
   * add to cart product quantity
   */
  onClickPlusProduct() {
    const new_amount = this.amount + 1;
    this.amount = new_amount;
  }

  /**
   * add cart product handler
   */
  onAddProduct() {
    this.cartService.addCartProduct(this.product, this.amount);
    this.modalService.openAlert(
      `${this.product.productName} has been added to cart!`
    );
    this.modalService.closeModal();
  }
}
