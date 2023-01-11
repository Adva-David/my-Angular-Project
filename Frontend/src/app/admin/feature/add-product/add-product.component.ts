import { ModalService } from './../../../shared/data-access/modal.service';
import { isValidForm } from 'src/app/shared/utils/utils';
import { Category } from './../../../shared/models/category.mode';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/shared/data-access/admin.service';
import { ProductsService } from './../../../shared/data-access/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  file?: string = null;
  newProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl<File>(null, [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
  });
  constructor(
    public productService: ProductsService,
    private modalService: ModalService,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {}

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
   * adds a product to app's product store
   */
  addProduct() {
    if (isValidForm(this.newProductForm, this.modalService)) {
      this.adminService.addProduct(this.newProductForm, this.file);
    }
  }
}
