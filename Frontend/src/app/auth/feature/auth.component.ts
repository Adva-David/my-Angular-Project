import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  showingPage = 'welcome';
  constructor() {}

  /**
   * changes the AUTH visible page to the login page
   */
  toLogin() {
    this.showingPage = 'login';
  }

  /**
   * changes the AUTH visible page to the register page
   */
  toRegister() {
    this.showingPage = 'register';
  }
  ngOnInit(): void {}
}
