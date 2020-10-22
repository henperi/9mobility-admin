import React from 'react';
import { FaWallet } from 'react-icons/fa';

import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';

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
            <Card fullWidth />
          </Column>
          <Column fullHeight useAppMargin xs={12} md={3}>
            <Card fullWidth fullHeight />
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
