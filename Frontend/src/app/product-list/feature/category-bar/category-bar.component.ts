import { Category } from './../../../shared/models/category.mode';
import { ProductsService } from './../../../shared/data-access/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss'],
})
export class CategoryBarComponent implements OnInit {
  constructor(public productService: ProductsService) {}

  ngOnInit(): void {}

  /**
   * marks category for product list filter mechanism
   * @param event input event
   * @param category selected category
   */
  onCategoryChanged(event: any, category: Category) {
    const selected = event.target.checked;
    this.productService.selectCategory(category.categoryName, selected);
  }
}
