import React, { createContext } from 'react';
import { initialState } from './modules';
import { sideBarInitialState } from './modules/sidebar/reducer';

interface IStateDispatch {
  state: typeof sideBarInitialState;
  dispatch: React.Dispatch<any>;
}

const SidebarContext = createContext<IStateDispatch>({
  state: sideBarInitialState,
  dispatch: () => null,
});

const SidebarProvider: React.FC<IStateDispatch> = ({
  children,
  state,
  dispatch,
}) => {
  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarContext = () => React.useContext(SidebarContext);

export { SidebarProvider, useSidebarContext };
