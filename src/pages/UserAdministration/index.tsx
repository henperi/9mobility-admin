import React, { useState } from 'react';

import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Text } from '../../components/UiKit/Text';
import { Colors } from '../../themes/colors';
import { Users } from './Users';
import { Roles } from './Roles';
import { NewUser } from './NewUser';
import { NewRole } from './NewRole';
import { ViewRole } from './ViewRole';

export const UserAdministration = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showRoleDrawer, setShowRoleDrawer] = useState(false);
  const [showViewRoleDrawer, setShowViewRoleDrawer] = useState(false);

  // const [newRoleSuccess, setNewRoleSuccess] = useState(false);
  const [newUserSuccess, setNewUserSuccess] = useState(false);
  const [newRoleSuccess, setNewRoleSuccess] = useState(false);

  const [roleToEdit, setRoleToEdit] = useState<{
    id: number;
    name: string;
  }>();

  const [roleToView, setRoleToView] = useState<{
    id: number;
    name: string;
  }>();

  return (
    <>
      <TopBar name="User Administration" />
      <Card fullWidth style={{ padding: '0 4%' }}>
        <Row childGap={15}>
          <Text
            style={{
              cursor: 'pointer',
              borderBottom: `solid 5px ${
                activeTab === 1 ? Colors.darkGreen : Colors.white
              }`,
              padding: `20px 15px`,
            }}
            onClick={() => setActiveTab(1)}
          >
            Users
          </Text>
          <Text
            style={{
              cursor: 'pointer',
              borderBottom: `solid 5px ${
                activeTab === 2 ? Colors.darkGreen : Colors.white
              }`,
              padding: `20px 15px`,
            }}
            onClick={() => setActiveTab(2)}
          >
            Roles
          </Text>
        </Row>
      </Card>
      <PageBody>
        {activeTab === 1 ? (
          <Users
            newUserSuccess={newUserSuccess}
            setShowDrawer={setShowDrawer}
          />
        ) : (
          <Roles
            newRoleSuccess={newRoleSuccess}
            setShowRoleDrawer={setShowRoleDrawer}
            setRoleToEdit={setRoleToEdit}
            setRoleToView={setRoleToView}
            setShowViewRoleDrawer={setShowViewRoleDrawer}
          />
        )}
      </PageBody>
      <NewUser
        showDrawer={showDrawer}
        setNewUserSuccess={setNewUserSuccess}
        newUserSuccess={newUserSuccess}
        setShowDrawer={setShowDrawer}
      />

      <NewRole
        showRoleDrawer={showRoleDrawer}
        setNewRoleSuccess={setNewRoleSuccess}
        newRoleSuccess={newUserSuccess}
        setShowRoleDrawer={setShowRoleDrawer}
        roleToEdit={roleToEdit}
      />

      <ViewRole
        setShowViewRoleDrawer={setShowViewRoleDrawer}
        showViewRoleDrawer={showViewRoleDrawer}
        roleToView={roleToView}
      />
    </>
  );
};
