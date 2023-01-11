import { User } from './../models/user.mode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { tap, BehaviorSubject, catchError, of, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  token$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  user$: BehaviorSubject<User> = new BehaviorSubject(undefined);

  tokenSubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.tokenSubscription = this.token$.subscribe((token) => {
      if (token) {
        this.getUser();
      }
    });
  }

  /**
   * after an order is completed  - removes cart object
   */
  userCompleteOrder() {
    this.user$.next({ ...this.user$.value, cart: undefined });
  }

  /**
   *
   * @returns a token from the cache
   */
  getToken() {
    let token = localStorage.getItem('token');
    if (!this.token$.value && token) this.token$.next(token);
    return this.token$.value ?? token;
  }

  /**
   *
   * @param token a token to be cached
   * @returns the token after caching
   */
  private setToken(token: string | null) {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    this.token$.next(token);
    return token;
  }

  /**
   *
   * @returns true if a user is logged in
   */
  isLoggedIn() {
    return this.getToken() !== undefined && this.getToken() !== null;
  }

  /**
   *
   * @param email user email
   * @param password user password
   * @returns a promise containing login status
   */
  login(email: string, password: string) {
    const response = this.httpClient
      .post<string>('auth/login', {
        email,
        password,
      })
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share());
    const sub = response.subscribe((token) => {
      if (!token) return;
      this.setToken(token);
      sub.unsubscribe();
    });
    return response;
  }

  /**
   *
   * @param user a user to be registered
   * @returns a promise containing registration status
   */
  register(user: User) {
    const response = this.httpClient
      .post<string>('auth/register', user)
      .pipe(catchError((e) => of(this.errorService.handleError(e))))
      .pipe(share());

    const sub = response.subscribe((token) => {
      if (!token) return;
      this.setToken(token);
      sub.unsubscribe();
    });
    return response;
  }

  /**
   * removes the user object from cache
   * logs the user out
   */
  logOut() {
    this.setToken(undefined);
    this.user$.next(undefined);
    this.router.navigate(['auth']);
  }

  /**
   * gets the user object with a valid token
   */
  private getUser() {
    this.httpClient
      .get<User>('auth/')
      .pipe(
        catchError((e) => {
          this.logOut(); // invalidate token
          return of(this.errorService.handleError(e));
        })
      )
      .subscribe((value) => value && this.user$.next(value));
  }

  /**
   *  updated current logged in user object with new values
   * @param user user properties to be updated
   */
  updateUser(user: Partial<User>) {
    this.user$.next({ ...this.user$.value, ...user });
  }

  // clean up rxjs subscriptions
  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }
}
