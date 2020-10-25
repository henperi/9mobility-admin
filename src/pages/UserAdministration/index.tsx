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
import { SimpleTable } from '../../components/UiKit/Table';
import { Avatar } from '../../components/UiKit/Avatar';
import { generateShortId } from '../../utils/generateShortId';

export const UserAdministration = () => {
  return (
    <>
      <TopBar name="User Administration" />
      <PageBody>
        <Row useAppMargin justifyContent="space-between">
          <Column fullHeight useAppMargin xs={12} md={6}>
            <Row useAppMargin>
              <Column useAppMargin xs={4} md={2}>
                <Button variant="default" fullWidth>
                  Filter
                </Button>
              </Column>
              <Column useAppMargin xs={6} md={8}>
                <TextField placeholder="Search Users" />
              </Column>
            </Row>
          </Column>
          <Column xs={12} md={4} lg={2} justifyContent="flex-end">
            <Button fullWidth>New User</Button>
          </Column>
        </Row>
        <SizedBox height={24} />
        <Column>
          <Card style={{ padding: '1.5rem' }} fullWidth>
            <SimpleTable
              scrollable
              columns={[
                'S//N',
                'Name',
                'Email',
                'Last Login',
                'Status',
                'Role',
                'Action',
              ]}
              data={[
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={4} lg={3}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={8} lg={9}>
                      <Text>Stephen Animashaun</Text>
                    </Column>
                  </Row>,
                  <Text key={generateShortId()}>
                    Stephenanimasaun@gmail.com
                  </Text>,
                  <Text key={generateShortId()}>25 Hours ago</Text>,
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Active
                  </Text>,
                  'Super admin',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={4} lg={3}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={8} lg={9}>
                      <Text>Stephen Animashaun</Text>
                    </Column>
                  </Row>,
                  <Text key={generateShortId()}>
                    Stephenanimasaun@gmail.com
                  </Text>,
                  <Text key={generateShortId()}>25 Hours ago</Text>,
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Active
                  </Text>,
                  'Super admin',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={4} lg={3}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={8} lg={9}>
                      <Text>Stephen Animas</Text>
                    </Column>
                  </Row>,
                  <Text key={generateShortId()}>
                    Stephenanimasaun@gmail.com
                  </Text>,
                  <Text key={generateShortId()}>25 Hours ago</Text>,
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Active
                  </Text>,
                  'Super admin',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={4} lg={3}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={8} lg={9}>
                      <Text>Stephen Animashaun</Text>
                    </Column>
                  </Row>,
                  <Text key={generateShortId()}>
                    Stephenanimasaun@gmail.com
                  </Text>,
                  <Text key={generateShortId()}>25 Hours ago</Text>,
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Active
                  </Text>,
                  'Super admin',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
              ]}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
