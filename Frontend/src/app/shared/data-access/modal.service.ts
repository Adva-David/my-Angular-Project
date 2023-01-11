import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum AlertType {
  Info = 'Info',
  Error = 'Error',
}
export enum ModalType {
  Default = 'default',
  AdminAddProduct = 'admin_p',
  ShowOrderCart = 'show_order_cart',
  AddProduct = 'add_product',
  SubmitOrder = 'submit_order',
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalContent: any;
  alertOpen: boolean = false;
  alertContent: string = 'Message';
  alertType: string = 'Info';
  alertAutoClose: boolean = true;
  modalOpen: boolean = false;
  modalType: string = ModalType.Default;
  subject$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  /**
   * opens modal with custom content
   * @param content modal content
   */
  setModalContent(content: any) {
    this.modalContent = content;
  }
  /**
   *
   * @param content (nullable) modal custom content
   * @param modalType modal type
   */
  openModal(content: any, modalType: ModalType) {
    this.modalOpen = true;
    this.modalType = modalType;
    this.setModalContent(content);
    this.subject$.next(true);
  }
  /**
   * closes the modal
   */
  closeModal() {
    this.modalOpen = false;
    this.modalContent = false;
    this.subject$.next(false);
  }

  /**
   *
   * @param content (nullable) alert custom content
   * @param alertType alert type
   * @param autoClose indication wether the alert should be auto closed
   */
  openAlert(
    content: string,
    alertType: AlertType | string = AlertType.Info,
    autoClose: boolean = true
  ) {
    this.alertOpen = true;
    this.alertAutoClose = autoClose;
    this.alertContent = content;
    this.alertType = alertType;
    if (autoClose) {
      setTimeout(() => {
        this.closeAlert();
      }, 3500);
    }
  }

  /**
   * closes the alert
   */
  closeAlert() {
    this.alertOpen = false;
    this.alertAutoClose = true;
    this.alertType = 'Info';
    this.alertContent = 'Message';
  }
}
