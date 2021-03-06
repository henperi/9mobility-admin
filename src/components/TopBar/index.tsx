import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';

import { ReactComponent as BellIcon } from '../../assets/images/bell.svg';
import { Row } from '../UiKit/Row';
import { Text } from '../UiKit/Text';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ScreenSizes } from '../UiKit/Column/styles';
import { Colors } from '../../themes/colors';

import { toggleSidebar } from '../../store/modules/sidebar/actions';
import { useSidebarContext } from '../../store/sidebarStore';
import { Column } from '../UiKit/Column';

export interface ITopBar extends HtmlHTMLAttributes<HTMLDivElement> {
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
}

export const TopBar: React.FC<ITopBar> = (props) => {
  const { name = 'Dashboard', ...rest } = props;

  const { dispatch } = useSidebarContext();
  const { width } = useWindowSize();

  return (
    <Styles.TopBar {...rest}>
      <>
        {width < ScreenSizes.lg && (
          <Styles.HanburgerMenu onClick={() => dispatch(toggleSidebar())} />
        )}

        <Row
          style={{ width: '100%' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Column xs={10}>
            <Text size={20}>{name}</Text>
          </Column>
          <Text color={Colors.black}>
            <BellIcon
              style={{ marginRight: '8px' }}
              // onClick={() => dispatch(removeAuthUser())}
            />
          </Text>
        </Row>
      </>
    </Styles.TopBar>
  );
};
