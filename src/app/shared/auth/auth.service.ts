import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';

export interface AuthResponseData {
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<UserModel>(null);
tokenExpireTime: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKpcpBUSt02kAJm3PvKB7HYjPANtMSu9s',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKpcpBUSt02kAJm3PvKB7HYjPANtMSu9s',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(res => {
          const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
          const user = new UserModel(res.email, res.displayName, expirationDate, res.idToken);
          localStorage.setItem('userData', JSON.stringify(user));
          this.user.next(user);
          this.autoLogOut(+res.expiresIn * 1000);
        })
      )
  }

  signOut() {
    localStorage.removeItem('userData');
    this.user.next(null);
  }

  autoLogin() {
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    if(!!localUserData) {
      this.user.next(localUserData);
      const newExpirationCountDown = new Date(localUserData.expiresIn).getTime() - new Date().getTime();
      clearTimeout(this.tokenExpireTime);
      this.autoLogOut(newExpirationCountDown);
    } else {
      this.router.navigate(['login']);
    }
  }

  autoLogOut(countDown: number) {
    console.log('autoLogOutIn', countDown);
    this.tokenExpireTime = setTimeout(() => {this.signOut()}, countDown);
  }

  handleError(errorResp: HttpErrorResponse): Observable<never> {
    console.log(errorResp)
    return throwError(() => {
      let errorText = 'Unknown Error';
      if (!errorResp.error || !errorResp.error.error) {
        return new Error(errorText);
      }
      switch(errorResp.error.error.message) {
        case "INVALID_EMAIL":
          errorText = 'The email address is badly formatted.';
          break;
        case "EMAIL_NOT_FOUND":
          errorText = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case "INVALID_PASSWORD":
          errorText = 'The password is invalid or the user does not have a password.';
          break;
        case "USER_DISABLED":
          errorText = 'The user account has been disabled by an administrator.';
          break;
      }

      return errorText;
    })
  }

}