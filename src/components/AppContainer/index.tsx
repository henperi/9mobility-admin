import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Styles } from './style';
// import { SideBar } from '../SideBar';
import { Row } from '../UiKit/Row';
import { Column } from '../UiKit/Column';
import { useGlobalStore } from '../../store';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ScreenSizes } from '../UiKit/Column/styles';
import { logger } from '../../utils/logger';
import { SideBar } from '../SideBar';

export const AppContainer: React.FC = ({ children }) => {
  const {
    state: { auth },
  } = useGlobalStore();

  logger.log(auth);

  const { width } = useScreenSize();
  const isLoginRoute = window.location.pathname.includes('login');

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const closeSidebar = () => {
      if (showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('click', closeSidebar);

    return () => window.removeEventListener('click', closeSidebar);
  }, [showSidebar]);

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Styles.AppContainer>
        <BrowserRouter>
          <Row wrap={false}>
            {window.location.pathname !== '/login' ? <SideBar /> : null}
            <Column
              style={{
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
