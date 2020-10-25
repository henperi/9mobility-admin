import { types } from './types';
import { AuthUser } from './interface';

export const authInitialState: {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
} = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authReducer = (
  state = authInitialState,
  action: { type: string; payload: { user: AuthUser; token: string } },
): typeof authInitialState => {
  switch (action.type) {
    case types.SET_AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };

    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case types.REMOVE_AUTH_USER:
      return {
        ...authInitialState,
      };

    default:
      return state;
  }
};
