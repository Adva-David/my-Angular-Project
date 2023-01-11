import { Product } from './../../../shared/models/product.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { isValidForm } from 'src/app/shared/utils/utils';
import { AdminService } from './../../../shared/data-access/admin.service';
import {
  ModalService,
  AlertType,
} from './../../../shared/data-access/modal.service';
import { ProductsService } from './../../../shared/data-access/products.service';
import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  file?: string = null;
  editProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl<string>(null),
    categoryName: new FormControl('', [Validators.required]),
  });

  @Input('product') public product: Product;
  @Output() editingEventEmitter = new EventEmitter<boolean>();
  constructor(
    public productService: ProductsService,
    private modalService: ModalService,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {}

  /**
   * dismisses edit mode handler
   */
  cancelEdit() {
    this.product = undefined;
    this.editingEventEmitter.emit(false);
  }

  /**
   *
   * @param event file selection event
   * selects an image and parses to DATA url
   */
  onSelectProductImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.file = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  /**
   * dismisses edit mode
   */
  close() {
    this.cancelEdit();
  }

  /**
   * submit's product edit
   */
  editProduct() {
    const price = this.editProductForm.value.price ?? this.product.price;
    const category =
      this.editProductForm.value.categoryName.length > 0
        ? this.editProductForm.value.categoryName
        : this.product.category.categoryName;
    const productName =
      this.editProductForm.value.productName ?? this.product.productName;
    let sub = this.adminService
      .editProduct({ ...this.product, price, category, productName }, this.file)
      .subscribe(() => {
        this.modalService.openAlert(
          `Successfully saved changes for ${productName}`,
          AlertType.Info
        );
        sub.unsubscribe();
      });
  }
}
