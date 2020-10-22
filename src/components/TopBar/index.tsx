import React, { HtmlHTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';
import { Styles } from './style';

import { ReactComponent as BellIcon } from '../../assets/images/bell.svg';
import { Row } from '../UiKit/Row';
// import { useGlobalStore } from '../../store';
// import { removeAuthUser } from '../../store/modules/auth/actions';
import { Text } from '../UiKit/Text';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ScreenSizes } from '../UiKit/Column/styles';
import { useInterceptor } from '../../hooks/useInterceptor';
import { Colors } from '../../themes/colors';

export interface ITopBar extends HtmlHTMLAttributes<HTMLDivElement> {
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBar: React.FC<ITopBar> = (props) => {
  const { setShowSidebar = () => null, ...rest } = props;
  // const { dispatch } = useGlobalStore();
  const history = useHistory();
  useInterceptor();

  // const handleLogout = () => {
  //   dispatch(removeAuthUser());
  // };

  const { width } = useWindowSize();

  return (
    <Styles.TopBar {...rest}>
      <>
        {width < ScreenSizes.lg && (
          <Styles.HanburgerMenu
            onClick={() => setShowSidebar((prev) => !prev)}
          />
        )}

        <Text size={20} onClick={() => history.push('/')}>
          Dashboard
        </Text>
        <Row
          style={{ width: '100%' }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text color={Colors.black}>
            <BellIcon style={{ marginRight: '8px' }} onClick={() => null} />
          </Text>
        </Row>
      </>
    </Styles.TopBar>
  );
};
