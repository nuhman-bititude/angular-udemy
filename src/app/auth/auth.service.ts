import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { userModel } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';

export interface AuthResponceData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<userModel>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponceData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIkey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responceData) => {
          this.handleAuth(
            responceData.email,
            responceData.localId,
            responceData.idToken,
            +responceData.expiresIn
          );
        })
      );
  }
  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new userModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      // checking if user have valid token
      // this.user.next(loadedUser);
      this.store.dispatch(
        new AuthActions.Login({
          email: loadedUser.email,
          token: loadedUser.token,
          userId: loadedUser.id,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponceData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIkey,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responceData) => {
          this.handleAuth(
            responceData.email,
            responceData.localId,
            responceData.idToken,
            +responceData.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new userModel(email, userId, token, expirationDate);
    this.store.dispatch(
      new AuthActions.Login({ email, userId, token, expirationDate })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponce: HttpErrorResponse) {
    let errorMessage = 'An unknown Error Occured!!';
    if (!errorResponce.error || !errorResponce.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponce.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage = 'Email Alreay Exists';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'Wrong Password';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'Account not Found';
        break;
      }
    }
    return throwError(errorMessage);
  }
}
