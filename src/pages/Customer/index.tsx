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

export const CustomerPage = () => {
  return (
    <>
      <TopBar name="Users" />
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
            <Button fullWidth>Export CSV</Button>
          </Column>
        </Row>
        <SizedBox height={24} />
        <Column>
          <Card style={{ padding: '1.5rem' }} fullWidth>
            <SimpleTable
              columns={[
                'S//N',
                'Name',
                'Primary Number',
                'Wallet',
                'Acct ID',
                'Type',
                'Action',
              ]}
              data={[
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={2}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={10}>
                      <Text>Stephen Animashaun</Text>
                      <Text>Stephenanimasaun@gmail.com</Text>
                    </Column>
                  </Row>,
                  '0907373772',
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Enabled
                  </Text>,
                  '1ADERSGE',
                  'Facebook',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={2}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={10}>
                      <Text>Stephen Animashaun</Text>
                      <Text>Stephenanimasaun@gmail.com</Text>
                    </Column>
                  </Row>,
                  '0907373772',
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Enabled
                  </Text>,
                  '1ADERSGE',
                  'Facebook',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={2}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={10}>
                      <Text>Stephen Animashaun</Text>
                      <Text>Stephenanimasaun@gmail.com</Text>
                    </Column>
                  </Row>,
                  '0907373772',
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Enabled
                  </Text>,
                  '1ADERSGE',
                  'Facebook',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  '1',
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={12} md={2}>
                      <Avatar />
                    </Column>
                    <Column useAppMargin xs={12} md={10}>
                      <Text>Stephen Animashaun</Text>
                      <Text>Stephenanimasaun@gmail.com</Text>
                    </Column>
                  </Row>,
                  '0907373772',
                  <Text
                    style={{
                      background: 'rgba(0, 168, 17, 0.1)',
                      padding: '0.5rem',
                    }}
                    key={generateShortId()}
                    size={12}
                    weight="bold"
                  >
                    Enabled
                  </Text>,
                  '1ADERSGE',
                  'Facebook',
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
