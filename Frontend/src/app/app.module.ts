import { ClientRequestsInterceptor } from './shared/data-access/intercepter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/feature/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/feature/auth.component';
import { LoginComponent } from './auth/feature/login/login.component';
import { RegisterComponent } from './auth/feature/register/register.component';
import { ProductListComponent } from './product-list/feature/product-list.component';
import { OrderComponent } from './order/feature/order.component';
import { ToolbarComponent } from './shared/ui/toolbar/toolbar.component';
import { AddProductComponent } from './admin/feature/add-product/add-product.component';
import { CategoryBarComponent } from './product-list/feature/category-bar/category-bar.component';
import { SearchBarComponent } from './shared/ui/search-bar/search-bar.component';
import { CartComponent } from './cart/feature/cart.component';
import { ModalComponent } from './shared/ui/modal/modal.component';
import { AddProductCartComponent } from './cart/feature/add-product/add-product-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CartProductCardComponent } from './cart/ui/cart-product-card/cart-product-card.component';
import { LoadingSpinnerComponent } from './shared/ui/loading-spinner/loading-spinner.component';
import { OrderSummaryComponent } from './order/ui/order-summary/order-summary.component';
import { AlertComponent } from './shared/ui/alert/alert.component';
import { ManageProductsComponent } from './admin/feature/manage-products/manage-products.component';
import { EditProductComponent } from './admin/feature/edit-product/edit-product.component';
import { OrderHistoryComponent } from './order/feature/order-history/order-history.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    ProductListComponent,
    ToolbarComponent,
    AddProductComponent,
    CategoryBarComponent,
    SearchBarComponent,
    CartComponent,
    ModalComponent,
    AddProductCartComponent,
    ProfileComponent,
    CartProductCardComponent,
    LoadingSpinnerComponent,
    OrderSummaryComponent,
    AlertComponent,
    ManageProductsComponent,
    EditProductComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientRequestsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
