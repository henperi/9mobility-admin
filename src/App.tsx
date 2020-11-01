import React, { useEffect } from 'react';
import { Routes } from './routes';
import { AppProvider } from './store';
import { rootReducer, initialState } from './store/modules';
import { initialiseStore } from './store/modules/init/actions';

import { AppContainer } from './components/AppContainer';
import { Spinner } from './components/UiKit/Spinner';
import { SidebarProvider } from './store/sidebarStore';
import {
  sideBarInitialState,
  sidebarReducer,
} from './store/modules/sidebar/reducer';

/**
 * The App Component
 *
 * @returns Jsx Element
 */
export function App() {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const [sidebarState, sidebarDispatch] = React.useReducer(
    sidebarReducer,
    sideBarInitialState,
  );

  useEffect(() => {
    initialiseStore(dispatch);
  }, []);

  return (
    <AppProvider state={state} dispatch={dispatch}>
      <SidebarProvider state={sidebarState} dispatch={sidebarDispatch}>
        <AppContainer>
          {state.app.isReady ? <Routes /> : <Spinner isFixed />}
        </AppContainer>
      </SidebarProvider>
    </AppProvider>
  );
}
