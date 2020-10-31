import React, { useState } from 'react';
import { FaWallet } from 'react-icons/fa';

import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Avatar } from '../../components/UiKit/Avatar';
import { useFetch } from '../../hooks/useRequests';
import { ICustomers } from '../Customer/interface';
import { Spinner } from '../../components/UiKit/Spinner';
import { Colors } from '../../themes/colors';

export const DashboardPage = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(5);

  const { data, loading } = useFetch<ICustomers>(
    `Mobility.OnboardingBackOffice/api/Users/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const {
    data: dailyTotalSignup,
    loading: loadingDailyTotalSignup,
  } = useFetch<{ total: number }>(
    `Mobility.OnboardingBackOffice/api/Users/GetDailyTotalSignUpToday`,
  );

  const { data: userReport, loading: loadingUserReport } = useFetch<{
    responseCode: number;
    message: string;
    result: {
      perMonth: number;
      perWeek: number;
      perDay: number;
    };
  }>(`Mobility.OnboardingBackOffice/api/Users/GetSignedUpUserReport`);

  const { data: signupSource, loading: loadingSignupSource } = useFetch<{
    result: {
      form: number;
      facebook: number;
      google: number;
      nil: number;
      total: number;
    };
    responseCode: number;
    message: 'Successfully Saved';
  }>(`Mobility.OnboardingBackOffice/api/Users/GetSignedUpSourceReport`);

  const getSignupSourceSocial = () =>
    signupSource
      ? signupSource.result.facebook +
        signupSource.result.google +
        signupSource.result.form
      : 0;

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
                    {loadingSignupSource ? '-' : signupSource?.result?.total}
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
                    Logged in user daily
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    {loadingUserReport ? '-' : userReport?.result.perDay}
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
                    Logged in user weekly
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    {loadingUserReport ? '-' : userReport?.result.perWeek}
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
                    Logged in user monthly
                  </Text>
                  <Text size={20} style={{ marginTop: '5px' }}>
                    {loadingUserReport ? '-' : userReport?.result.perMonth}
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
                    {loadingSignupSource ? '-' : getSignupSourceSocial()}
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
                    {loadingSignupSource ? '-' : signupSource?.result.form || 0}
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
                    <Row alignItems="flex-start">
                      <Avatar
                        image={customer.imageUrl}
                        style={{ marginRight: '10px' }}
                      />
                      <div>
                        <Text>
                          {`${customer.firstName} ${customer.lastName}`}
                        </Text>
                        <SizedBox height={0.005} />
                        <Text size={12} variant="lighter">
                          Registered on{' '}
                          {DateTime.fromISO(
                            customer.dateCreated,
                          ).toLocaleString(DateTime.DATETIME_MED)}
                        </Text>
                      </div>
                    </Row>
                    <SizedBox height={24} />
                  </div>
                ))
              )}
              <SizedBox height={8} />
              {data?.result.nextPageUrl && (
                <Row justifyContent="center">
                  <Link to="/customer" style={{ textDecoration: 'none' }}>
                    <Text color={Colors.darkGreen} size={14}>
                      View All
                    </Text>
                  </Link>
                </Row>
              )}
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
