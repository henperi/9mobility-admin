import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Styles } from './style';
// import { SideBar } from '../SideBar';
import { Row } from '../UiKit/Row';
import { Column } from '../UiKit/Column';
import { useGlobalStore } from '../../store';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ScreenSizes } from '../UiKit/Column/styles';
// import { logger } from '../../utils/logger';
import { SideBar } from '../SideBar';
// import { toggleSidebar } from '../../store/modules/init/actions';

export const AppContainer: React.FC = ({ children }) => {
  const {
    state: { app },
    // dispatch,
  } = useGlobalStore();

  const { width } = useScreenSize();
  const isLoginRoute = window.location.pathname.includes('login');

  // useEffect(() => {
  //   const closeSidebar = () => {
  //     if (app.showSidebar) {
  //       dispatch(toggleSidebar());
  //     }
  //   };

  //   window.addEventListener('click', closeSidebar);

  //   return () => window.removeEventListener('click', closeSidebar);
  // }, [app.showSidebar, dispatch]);

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <BrowserRouter>
          <Row wrap={false}>
            {window.location.pathname !== '/login' ? (
              <SideBar showSidebar={app.showSidebar} />
            ) : null}
            <Column
              style={{
                transition: 'transform 600ms ease-in-out',
                width:
                  width >= ScreenSizes.lg && !isLoginRoute
                    ? 'calc(100% - 240px)'
                    : '100%',
              }}
            >
              {children}
            </Column>
          </Row>
        </BrowserRouter>
      </Styles.AppContainer>
    </ThemeProvider>
  );
};
