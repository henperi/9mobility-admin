import types from './types';

export const sideBarInitialState = {
  showSidebar: false,
};

interface Action {
  type: string;
  payload: {
    status: boolean;
  };
}

export const sidebarReducer = (state = sideBarInitialState, action: Action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    default:
      return state;
  }
};
