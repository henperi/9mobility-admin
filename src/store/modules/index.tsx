import { appReducer, appInitialState } from './init/reducer';
import { authReducer, authInitialState } from './auth/reducer';
// import { sideBarInitialState } from '../sidebarStore';
import { sideBarInitialState, sidebarReducer } from './sidebar/reducer';

export const initialState = {
  app: appInitialState,
  auth: authInitialState,
};

export const rootReducer = (state: typeof initialState, action: any) => {
  const { app } = state;

  return {
    app: appReducer(app, action),
    auth: authReducer(authInitialState, action),
  };
};

export const rsideBarReducer = (
  state: typeof sideBarInitialState,
  action: any,
) => {
  const { showSidebar } = state;

  return {
    app: sidebarReducer({ showSidebar }, action),
  };
};
