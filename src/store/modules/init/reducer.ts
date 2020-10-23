import types from './types';

export const appInitialState = {
  isReady: false,
  noNetwork: false,
  showSidebar: false,
};

interface Action {
  type: string;
  payload: {
    status: boolean;
  };
}

export const appReducer = (state = appInitialState, action: Action) => {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state,
        isReady: true,
      };

    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    case types.SET_NETWORK_ERROR:
      return {
        ...state,
        noNetwork: action.payload.status,
      };

    default:
      return state;
  }
};
