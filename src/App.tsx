import React, { useEffect } from 'react';
import { Routes } from './routes';
import { AppProvider } from './store';
import { rootReducer, initialState } from './store/modules';
import { initialiseStore } from './store/modules/init/actions';

import { AppContainer } from './components/AppContainer';
import { Spinner } from './components/UiKit/Spinner';

/**
 * The App Component
 *
 * @returns Jsx Element
 */
export function App() {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);

  useEffect(() => {
    initialiseStore(dispatch);
  }, []);

  return (
    <AppProvider state={state} dispatch={dispatch}>
      <AppContainer>
        {state.app.isReady ? <Routes /> : <Spinner isFixed />}
      </AppContainer>
    </AppProvider>
  );
}
