import { ModalService, AlertType } from './modal.service';
import { Router } from '@angular/router';
import { DefaultUserObject } from './../models/user.mode';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router, private modalService: ModalService) {}

  /**
   * a helper function to log out upon expired token
   */
  logOut() {
    this.setToken(null);
    this.router.navigate(['auth']);
  }
  private setToken(token: string | null) {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    return token;
  }

  /**
   * @param e error to be thrown
   * handles HttpClient errors
   */
  handleError(e: any): any {
    switch (e.status) {
      case 401: // token invalid -> logout
        if (e.error && e.error.message) {
          if (e.error.message.toLowerCase().includes('invalid token'))
            this.logOut();
          else this.modalService.openAlert(e.error.message, AlertType.Error);
        }
        break;
      case 400:
        switch (e.error) {
          case 'User not found':
            this.modalService.openAlert(e.error, AlertType.Error);
            return;
        }
        if (e.error.message) {
          // special auth error cases
          const msg = e.error.message.split(':')[2];
          if (msg) this.modalService.openAlert(msg);
          else this.modalService.openAlert(e.error.message, AlertType.Error);
        } else {
          this.modalService.openAlert(e.error, AlertType.Error);
        }
        break;
    }
    return null;
  }
}
