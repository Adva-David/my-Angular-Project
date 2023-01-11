import { ModalService } from './../../../shared/data-access/modal.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from './../../../shared/data-access/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passportId: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
  });

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}
  /**
   * submits register form
   */
  onSubmitRegister() {
    const email = this.registerForm.value.email!!;
    const password = this.registerForm.value.password!!;
    const firstName = this.registerForm.value.firstName!!;
    const lastName = this.registerForm.value.lastName!!;
    const city = this.registerForm.value.city!!;
    const street = this.registerForm.value.street!!;
    const passportId = this.registerForm.value.passportId!!;
    let sub = this.authService
      .register({
        email,
        password,
        firstName,
        lastName,
        city,
        street,
        passportId,
        cart: undefined,
        orders: [],
        admin: false,
      })
      .pipe(catchError(this.log))
      .subscribe((token) => {
        this.router.navigate(['/home']);
        sub.unsubscribe();
      });
  }

  /**
   *
   * @param e logs errors
   * @returns
   */
  log(e: any) {
    this.modalService.openAlert(e.message);
    console.log(e.message);
    return e;
  }
}
