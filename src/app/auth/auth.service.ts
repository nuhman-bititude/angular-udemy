// import { userModel } from './user.model';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';

// export interface AuthResponceData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   user = new BehaviorSubject<userModel>(null);

//   constructor(private http: HttpClient) {}
//   signUp(email: string, password: string) {
//     return this.http
//       .post<AuthResponceData>(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD__s-tqjoMbWXN7o_UrgQZiKNSX5GeSyc',
//         {
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }
//       )
//       .pipe(
//         catchError(this.handleError),
//         tap((responceData) => {
//           this.handleAuth(
//             responceData.email,
//             responceData.localId,
//             responceData.idToken,
//             +responceData.expiresIn
//           );
//         })
//       );
//   }

//   login(email: string, password: string) {
//     return this.http
//       .post<AuthResponceData>(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD__s-tqjoMbWXN7o_UrgQZiKNSX5GeSyc',
//         { email, password, returnSecureToken: true }
//       )
//       .pipe(
//         catchError(this.handleError),
//         tap((responceData) => {
//           this.handleAuth(
//             responceData.email,
//             responceData.localId,
//             responceData.idToken,
//             +responceData.expiresIn
//           );
//         })
//       );
//   }

//   private handleAuth(
//     email: string,
//     userid: string,
//     token: string,
//     expiresIn: number
//   ) {
//     const expirationDate = new Date(new Date().getTime() + expiresIn + 1000);
//     const user = new userModel(email, userid, token, expirationDate);
//     this.user.next(user);
//   }

//   private handleError(errorResponce: HttpErrorResponse) {
//     let errorMessage = 'An unknown Error Occured!!';
//     if (!errorResponce.error || !errorResponce.error.error) {
//       return throwError(errorMessage);
//     }
//     switch (errorResponce.error.error.message) {
//       case 'EMAIL_EXISTS': {
//         errorMessage = 'Email Alreay Exists';
//         break;
//       }
//       case 'INVALID_PASSWORD': {
//         errorMessage = 'Wrong Password';
//         break;
//       }
//       case 'EMAIL_NOT_FOUND': {
//         errorMessage = 'Account not Found';
//         break;
//       }
//     }
//     return throwError(errorMessage);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { userModel } from './user.model';

export interface AuthResponceData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<userModel>(null);

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponceData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponceData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new userModel(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
