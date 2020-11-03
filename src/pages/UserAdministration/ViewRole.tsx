import React from 'react';
import { Drawer } from '../../components/RightDrawer';
import { Column } from '../../components/UiKit/Column';
import { Text } from '../../components/UiKit/Text';
import { Colors } from '../../themes/colors';

interface RProps {
  showViewRoleDrawer: boolean;
  setShowViewRoleDrawer: any;
  roleToView:
    | {
        id: number;
        name: string;
      }
    | undefined;
}

export const ViewRole: React.FC<RProps> = ({
  showViewRoleDrawer,
  setShowViewRoleDrawer,
  roleToView,
}) => {
  return (
    <Drawer
      showDrawer={showViewRoleDrawer}
      setShowDrawer={setShowViewRoleDrawer}
    >
      <Column>
        <Text color={Colors.blackGrey}>Name</Text>
        <Text>{roleToView?.name}</Text>
      </Column>

      {/* <Column>
        <Text>Name</Text>
        <Text>{roleToView?.name}</Text>
      </Column> */}
    </Drawer>
  );
};
