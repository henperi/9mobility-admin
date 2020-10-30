import React from 'react';
// import { FaWallet } from 'react-icons/fa';

import { useRouteMatch } from 'react-router-dom';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { TableNav } from './TableNav';
import { Avatar } from '../../components/UiKit/Avatar';
import { ICustomer } from './interface';
import { useFetch } from '../../hooks/useRequests';
import { generateShortId } from '../../utils/generateShortId';
import { Spinner } from '../../components/UiKit/Spinner';

export const CustomerDetails: React.FC = ({ children }) => {
  const { id } = useRouteMatch().params as any;

  const { data, loading } = useFetch<{
    result: ICustomer;
    message: string;
    responseCode: 0;
  }>(`Mobility.OnboardingBackOffice/api/Users/GetUser?id=${id}`);

  return (
    <>
      <TopBar name="Users" />
      <PageBody>
        {loading && <Spinner isFixed />}
        {data?.result && (
          <>
            <Column>
              <Card style={{ padding: '1.5rem', display: 'flex' }} fullWidth>
                <Row style={{ display: 'flex' }}>
                  <Column
                    style={{
                      maxWidth: '428px',
                      borderRight: '1px solid #ECECF2',
                      display: 'flex',
                    }}
                  >
                    <Row>
                      <Column>
                        <Row useAppMargin>
                          <Column useAppMargin xs={12} lg={2}>
                            <Avatar
                              style={{
                                height: '56px',
                                width: '56px',
                                borderRight: '4px',
                              }}
                            />
                          </Column>
                          <Column useAppMargin xs={12} lg={10}>
                            <Text size={16} weight={600}>
                              {data.result.firstName} {data.result.lastName}
                            </Text>
                            <SizedBox height={5} />
                            <Text color="#8181A5" size={14} weight={400}>
                              {data.result.email}
                            </Text>
                            <SizedBox height={8} />
                            <Row>
                              <Text
                                color="#006848"
                                weight={700}
                                style={{
                                  borderRight: '1px solid #ECECF2',
                                  paddingRight: '12px',
                                }}
                              >
                                {data.result.mobileNumber}
                              </Text>
                              {/* <Text
                                color="#006848"
                                style={{ paddingLeft: '12px' }}
                              >
                                Morecliq
                              </Text> */}
                            </Row>
                            <SizedBox height={8} />
                            <Row>
                              <Text
                                color="#8181A5"
                                style={{ paddingRight: '10px' }}
                                size={14}
                              >
                                Registered:
                              </Text>
                              <Text size={14}>
                                {data.result.registeredThrough}
                              </Text>
                            </Row>
                            <SizedBox height={8} />
                            <Row>
                              <Text
                                color="#8181A5"
                                style={{ paddingRight: '10px' }}
                                size={14}
                              >
                                Wallet:
                              </Text>
                              <Text size={14}>
                                {' '}
                                {data.result.isWalletEnabled
                                  ? 'Enabled'
                                  : 'Disabled'}
                              </Text>
                            </Row>
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  </Column>
                  <Column
                    style={{ maxWidth: '428px', paddingLeft: '12px' }}
                    lg={10}
                  >
                    <Row>
                      <Column xs={12} md={3}>
                        <Text
                          style={{ paddingRight: '10px' }}
                          size={14}
                          weight={700}
                        >
                          Primary No
                        </Text>
                      </Column>
                      <Column xs={12} md={4}>
                        <Text size={14}>{data.result.mobileNumber}</Text>
                      </Column>
                    </Row>
                    <SizedBox height={18} />
                    <Row>
                      <Column xs={12} md={3}>
                        <Text
                          style={{ paddingRight: '10px' }}
                          size={14}
                          weight={700}
                        >
                          Secondary No
                        </Text>
                      </Column>
                      <Column xs={12} md={4}>
                        {data.result.userSims?.map((sim) => (
                          <Text key={generateShortId()} size={14}>
                            {sim.mobileNumber}
                          </Text>
                        ))}
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </Column>
            <SizedBox height={24} />
            <TableNav />
            <SizedBox height={24} />
            {children}
          </>
        )}
      </PageBody>
    </>
  );
};
