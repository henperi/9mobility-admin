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
    state: { app, auth },
  } = useGlobalStore();

  const { width } = useScreenSize();
  // const isLoginRoute = window.location.pathname.includes('login');

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <BrowserRouter>
          <Row wrap={false}>
            {auth.user?.token ? (
              <SideBar showSidebar={app.showSidebar} />
            ) : null}
            <Column
              style={{
                transition: 'transform 600ms ease-in-out',
                width:
                  width >= ScreenSizes.lg && auth.user?.token
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
