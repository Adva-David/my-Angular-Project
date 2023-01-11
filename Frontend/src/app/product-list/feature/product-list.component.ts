import {
  ModalService,
  ModalType,
} from './../../shared/data-access/modal.service';
import { ProductsService } from './../../shared/data-access/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    public productService: ProductsService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {}

  /**
   * opens the modal with Client Add product mode
   * @param product a product to add to cart
   */
  openAddToCart(product: Product) {
    this.modalService.openModal(product, ModalType.AddProduct);
  }
}
