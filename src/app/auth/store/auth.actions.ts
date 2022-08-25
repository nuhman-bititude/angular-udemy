import { Action } from '@ngrx/store';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const LOGIN_START = '[AUTH] Login Start';
export const SIGNUP_START = '[AUTH] Signup Start';
export const HANDLE_ERROR = '[AUTH] Handle Error';
export const AUTO_LOGIN = '[AUTH] Auto Login';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}
export class HandleError implements Action {
  readonly type = HANDLE_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActionsTypes =
  | AuthenticateSuccess
  | Logout
  | AuthenticateFail
  | LoginStart
  | SignupStart
  | HandleError
  | AutoLogin;
