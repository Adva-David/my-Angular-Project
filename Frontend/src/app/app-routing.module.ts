import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ManageProductsComponent } from './admin/feature/manage-products/manage-products.component';
import { OrderSummaryComponent } from './order/ui/order-summary/order-summary.component';
import { OrderCGuard } from './shared/guards/order-c.guard';
import { OrderGuard } from './shared/guards/order.guard';
import { CartComponent } from './cart/feature/cart.component';
import { LoggedIn } from './shared/guards/loggedin.guard';
import { AuthComponent } from './auth/feature/auth.component';
import { HomeComponent } from './home/feature/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/feature/order.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: ManageProductsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'auth', component: AuthComponent, canActivate: [LoggedIn] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard, OrderGuard],
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent,
    canActivate: [AuthGuard, OrderGuard, OrderCGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
