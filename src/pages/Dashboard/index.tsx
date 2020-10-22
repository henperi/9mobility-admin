import React from 'react';
import { FaWallet } from 'react-icons/fa';

import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Avatar } from '../../components/UiKit/Avatar';
import { Button } from '../../components/UiKit/Button';

export const DashboardPage = () => {
  return (
    <>
      <TopBar />
      <PageBody>
        <Row useAppMargin wrap>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={6}>
                  <Text color="#8181A5" variant="lighter">
                    Total active user
                  </Text>
                  <Text>1,345</Text>
                </Column>
                <Column
                  xs={3}
                  fullHeight
                  style={{
                    height: '56px',
                    backgroundColor: '#EFF2FE',
                    borderRadius: '1rem',
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet />
                </Column>
              </Row>
            </Card>
          </Column>
        </Row>
        <SizedBox height={30} />
        <Row useAppMargin>
          <Column fullHeight useAppMargin xs={12} md={9}>
            <Card fullWidth fullHeight />
          </Column>
          <Column fullHeight useAppMargin xs={12} md={3}>
            <Card fullWidth fullHeight>
              <Text size={20}>Last 5 Users</Text>
              <SizedBox height={10} />
              <Row useAppMargin alignItems="center">
                <Column useAppMargin xs={12} lg={2}>
                  <Avatar style={{ marginRight: '10px' }} />
                </Column>
                <Column useAppMargin xs={12} lg={10}>
                  <Text>Stephen Animashaun</Text>
                  <Text size={12} variant="lighter">
                    Registered on Aug 5, 2020 at 5:41pm
                  </Text>
                </Column>
              </Row>
              <SizedBox height={10} />
              <Row useAppMargin alignItems="center">
                <Column useAppMargin xs={12} lg={2}>
                  <Avatar style={{ marginRight: '10px' }} />
                </Column>
                <Column useAppMargin xs={12} lg={10}>
                  <Text>Stephen Animashaun</Text>
                  <Text size={12} variant="lighter">
                    Registered on Aug 5, 2020 at 5:41pm
                  </Text>
                </Column>
              </Row>
              <SizedBox height={10} />
              <Row useAppMargin alignItems="center">
                <Column useAppMargin xs={12} lg={2}>
                  <Avatar style={{ marginRight: '10px' }} />
                </Column>
                <Column useAppMargin xs={12} lg={10}>
                  <Text>Stephen Animashaun</Text>
                  <Text size={12} variant="lighter">
                    Registered on Aug 5, 2020 at 5:41pm
                  </Text>
                </Column>
              </Row>
              <SizedBox height={10} />
              <Row useAppMargin alignItems="center">
                <Column useAppMargin xs={12} lg={2}>
                  <Avatar style={{ marginRight: '10px' }} />
                </Column>
                <Column useAppMargin xs={12} lg={10}>
                  <Text>Stephen Animashaun</Text>
                  <Text size={12} variant="lighter">
                    Registered on Aug 5, 2020 at 5:41pm
                  </Text>
                </Column>
              </Row>
              <SizedBox height={10} />
              <Row useAppMargin alignItems="center">
                <Column useAppMargin xs={12} lg={2}>
                  <Avatar style={{ marginRight: '10px' }} />
                </Column>
                <Column useAppMargin xs={12} lg={10}>
                  <Text>Stephen Animashaun</Text>
                  <Text size={12} variant="lighter">
                    Registered on Aug 5, 2020 at 5:41pm
                  </Text>
                </Column>
              </Row>
              <SizedBox height={40} />
              <Row justifyContent="center" alignItems="center">
                <Button outline>View All</Button>
              </Row>
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
