import * as AuthActions from './auth.actions';
import { userModel } from './../user.model';

export interface State {
  user: userModel;
  authError: string;
  loading: boolean;
}

const initailState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initailState,
  action: AuthActions.AuthActionsTypes
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS: {
      const user = new userModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };
    }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case AuthActions.AUTHENTICATE_FAIL: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }
    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}
