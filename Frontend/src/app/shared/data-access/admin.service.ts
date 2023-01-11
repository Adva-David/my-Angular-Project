import { ProductForm } from './../models/product.model';
import { ErrorService } from './error.service';
import { share, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  /**
   * adds a product to app's product store
   * @param formGroup a form object
   * @param file selected product-image file
   * @returns a promise containing the submission status
   */
  addProduct(formGroup: FormGroup, file: string) {
    const productName = formGroup.value.productName;
    const category = formGroup.value.categoryName;
    const price = formGroup.value.price;
    return this.httpClient
      .post(
        'admin/products',
        { productName, category, price, image: file },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share());
  }

  /**
   *
   * @param product a product to be edited
   * @param file a image file for the edited product
   * @returns a promise containing the submission status
   */
  editProduct(product: ProductForm, file: string) {
    return this.httpClient
      .post(
        'admin/products/edit',
        { product, image: file },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share());
  }
}
