import { ProductsService } from './../../data-access/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(public productService: ProductsService) {}

  ngOnInit(): void {}

  onSearch(event: any) {
    let query = event.target.value;
    this.productService.filterByQuery(query);
  }
}
