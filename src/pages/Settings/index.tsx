import React from 'react';
// import { FaWallet } from 'react-icons/fa';

import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { Avatar } from '../../components/UiKit/Avatar';

export const Settings = () => {
  return (
    <>
      <TopBar name="Settings" />
      <PageBody>
        <SizedBox height={24} />
        <Row>
          <Column xs={12} md={4}>
            <Text size={32}>Personal Details</Text>
            <Text variant="lighter">Your personal details</Text>
            <SizedBox height={10} />
          </Column>
          <Column xs={12} md={8} lg={6}>
            <Card style={{ padding: '2rem' }} fullWidth>
              <Row wrap alignItems="center">
                <Avatar
                  style={{
                    width: '100px',
                    height: '100px',
                    marginRight: '1rem',
                  }}
                />
                <div>
                  <Button>Change Image</Button>
                </div>
              </Row>
              <SizedBox height={20} />
              <TextField
                label="First Name"
                placeholder="Enter your first name"
              />
              <TextField label="Last Name" placeholder="Enter your last name" />
              <TextField
                label="Email address"
                placeholder="Enter your email address"
                readOnly
              />
              <Row justifyContent="flex-end">
                <Button>Update Profile</Button>
              </Row>
            </Card>
          </Column>
        </Row>
        <SizedBox height={50} />
        <Row>
          <Column xs={12} md={4}>
            <Text size={32}>Change Password</Text>
            <Text variant="lighter">Update your password</Text>
            <SizedBox height={10} />
          </Column>
          <Column xs={12} md={8} lg={6}>
            <Card style={{ padding: '2rem' }} fullWidth>
              <TextField
                label="Old Password"
                placeholder="Enter your old password"
              />
              <TextField
                label="New Password"
                placeholder="Enter your new password"
              />
              <TextField
                label="Repeat Password"
                placeholder="Enter your new password again"
              />
              <Row justifyContent="flex-end">
                <Button>Update Password</Button>
              </Row>
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
