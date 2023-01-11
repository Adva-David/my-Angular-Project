import { AuthService } from './../../../shared/data-access/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * submits login form
   */
  onSubmitLogin() {
    const email = this.loginForm.value.email;
    const pass = this.loginForm.value.password;
    let sub = this.authService.login(email, pass).subscribe((token) => {
      if (!token) return;
      this.router.navigate(['/home']);
      sub.unsubscribe();
    });
  }
}
