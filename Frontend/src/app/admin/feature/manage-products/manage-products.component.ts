import { AdminService } from 'src/app/shared/data-access/admin.service';
import { ProductsService } from './../../../shared/data-access/products.service';
import { Product } from './../../../shared/models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  editingProduct: Product;
  constructor(
    public productsService: ProductsService,
    public adminService: AdminService
  ) {}

  /**
   *
   * @param editing indication of edit cancelation  status
   */
  cancelEdit(editing: boolean) {
    if (!editing) {
      this.editingProduct = undefined;
    }
  }

  /**
   * enters edit mode
   * @param p a product to start edit mode on
   */
  startEdit(p: Product) {
    let i = window.scrollY;
    let interval = setInterval(() => {
      if (i <= 0) {
        clearInterval(interval);
        return;
      }
      i -= 100;
      i = Math.max(0, i);
      window.scrollTo(0, i);
    }, 10);
    this.editingProduct = p;
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {}
}
