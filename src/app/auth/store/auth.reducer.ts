import * as AuthActions from './auth.actions';
import { userModel } from './../user.model';

export interface State {
  user: userModel;
}

const initailState: State = {
  user: null,
};

export function authReducer(
  state = initailState,
  action: AuthActions.AuthActionsTypes
) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      const user = new userModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user, // same as user: user,
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
