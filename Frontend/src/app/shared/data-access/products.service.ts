import { Category } from './../models/category.mode';
import { SocketService } from './socket.service';
import { ErrorService } from './error.service';
import { share, take } from 'rxjs/operators';
import { Product } from './../models/product.model';
import {
  Observable,
  catchError,
  of,
  observable,
  BehaviorSubject,
  tap,
  Subscription,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnDestroy {
  products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  showingProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  categories$: Observable<Category[]>;
  selectedCategories = {} as any;
  subscription: Subscription;
  filterQuery: string = null;
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private socketService: SocketService
  ) {
    this.getProducts();
    this.getCategories();
    this.socketService.listen({
      receive: (data) => {
        this.getProducts();
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * subscribes to app product store
   */
  getProducts() {
    let prodsSub = this.httpClient
      .get<Product[]>('products')
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share())
      .pipe(tap((el: any) => this.showingProducts$.next(el)));

    // maybe we will need to clean up
    this.subscription = prodsSub.subscribe(this.products$);
  }

  /**
   *
   * @param categoryName a category name to be filtered
   * @param selected on-off toggle mode
   */
  selectCategory(categoryName: string, selected: boolean) {
    this.selectedCategories[categoryName] = selected;
    this.filterByCategories();
  }

  /**
   *
   * filter's product list based on selected categories
   */
  filterByCategories() {
    const checked = Object.values(this.selectedCategories);
    let proceed = false;
    for (let c of checked) {
      if (c) {
        proceed = true;
        break;
      }
    }
    if (!proceed) {
      this.showingProducts$.next(this.products$.value);
      return;
    }
    let prods = this.products$.value;
    let filtered = prods.filter(
      (prod) => this.selectedCategories[prod.category.categoryName]
    );
    this.showingProducts$.next(filtered);
  }

  /**
   *
   * @param query some query text
   * filter's product list based on free text query
   */
  filterByQuery(query: string) {
    if (!query) {
      this.filterQuery = null;
      return this.filterByCategories();
    }
    let prods = this.showingProducts$.value;
    let filtered = prods.filter((prod) =>
      prod.productName.toLowerCase().includes(query.toLowerCase())
    );
    this.filterQuery = query;
    this.showingProducts$.next(filtered);
  }

  /**
   * subscribes to app's product categories
   */
  getCategories() {
    this.categories$ = this.httpClient
      .get<Category[]>('products/categories')
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share());
  }
}
