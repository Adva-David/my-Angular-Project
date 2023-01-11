import {
  ModalService,
  ModalType,
} from './../../shared/data-access/modal.service';
import { AuthService } from './../../shared/data-access/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  RequiredValidator,
} from '@angular/forms';
import { ProductsService } from './../../shared/data-access/products.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/data-access/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  side_bar_visibility: string = 'visible';
  constructor(
    public authService: AuthService,
    public productService: ProductsService,
    public adminService: AdminService,
    public modalService: ModalService
  ) {}

  /**
   * toggles the left side of the home page's visibility
   */
  toggleSideBar() {
    this.side_bar_visibility = this.isSideBarVisible()
      ? 'invisible'
      : 'visible';
  }
  /**
   *
   * @returns true if sidebar is visible
   */
  isSideBarVisible() {
    return this.side_bar_visibility === 'visible';
  }
  /**
   * opens the modal with Admin add product mode
   */
  openAddProduct() {
    this.modalService.openModal(null, ModalType.AdminAddProduct);
  }
  ngOnInit(): void {}
}
