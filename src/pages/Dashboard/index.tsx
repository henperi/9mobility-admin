import React, { useState } from 'react';
import { FaWallet } from 'react-icons/fa';

import { DateTime } from 'luxon';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Avatar } from '../../components/UiKit/Avatar';
import { Button } from '../../components/UiKit/Button';
import { useFetch } from '../../hooks/useRequests';
import { ICustomers } from '../Customer/interface';
import { Spinner } from '../../components/UiKit/Spinner';
import { useGlobalStore } from '../../store';
import { logger } from '../../utils/logger';

export const DashboardPage = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(5);

  const { data, loading } = useFetch<ICustomers>(
    `Mobility.OnboardingBackOffice/api/Users/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const { state } = useGlobalStore();
  logger.log(state);

  const {
    data: dailyTotalSignup,
    loading: loadingDailyTotalSignup,
  } = useFetch<{ total: number }>(
    `Mobility.OnboardingBackOffice/api/Users/GetDailyTotalSignUpToday`,
  );

  return (
    <>
      <TopBar />
      <PageBody>
        <Row useAppMargin wrap>
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Total active user
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    1,345
                  </Text>
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
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Logged In User daily
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    1,345
                  </Text>
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
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Logged In user weekly
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    1,345
                  </Text>
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
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Logged In user monthly
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    1,345
                  </Text>
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
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Total signups daily
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    {loadingDailyTotalSignup ? '-' : dailyTotalSignup?.total}
                  </Text>
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
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Total signups daily (Social)
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    1,345
                  </Text>
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
          <Column fullHeight useAppMargin xs={12} md={4} lg={3}>
            <Card fullWidth fullHeight>
              <Row justifyContent="space-between" alignItems="center">
                <Column xs={9}>
                  <Text color="#8181A5" variant="lighter" size={14}>
                    Total signups daily (Form)
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    1,345
                  </Text>
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
            <Card fullWidth fullHeight style={{ minHeight: '300px' }}>
              <Text size={20}>Last 5 Users</Text>
              <SizedBox height={10} />
              {loading ? (
                <Spinner isFixed />
              ) : (
                data?.result.results.map((customer) => (
                  <div key={customer.mobileNumber}>
                    <Row useAppMargin alignItems="center">
                      <Column useAppMargin xs={12} lg={2}>
                        <Avatar
                          image={customer.imageUrl}
                          style={{ marginRight: '10px' }}
                        />
                      </Column>
                      <Column useAppMargin xs={12} lg={10}>
                        <Text>
                          {`${customer.firstName} ${customer.lastName}`}
                        </Text>
                        <Text size={12} variant="lighter">
                          Registered on{' '}
                          {DateTime.fromISO(
                            customer.dateCreated,
                          ).toLocaleString(DateTime.DATETIME_MED)}
                        </Text>
                      </Column>
                    </Row>
                    <SizedBox height={10} />
                  </div>
                ))
              )}
              {data?.result.nextPageUrl && (
                <Row justifyContent="center" alignItems="center">
                  <Button link>View All</Button>
                </Row>
              )}
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
