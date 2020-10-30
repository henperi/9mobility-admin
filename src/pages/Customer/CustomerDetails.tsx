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
import { logger } from '../../utils/logger';

export const CustomerDetails: React.FC = ({ children }) => {
  const match = useRouteMatch();

  logger.log(match);
  return (
    <>
      <TopBar name="Users" />
      <PageBody>
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
                          Stephen Animashaun
                        </Text>
                        <SizedBox height={5} />
                        <Text color="#8181A5" size={14} weight={400}>
                          Stephenanimasaun@gmail.com
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
                            090567855785
                          </Text>
                          <Text color="#006848" style={{ paddingLeft: '12px' }}>
                            Morecliq
                          </Text>
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
                          <Text size={14}>Facebook</Text>
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
                          <Text size={14}> Enabled</Text>
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
                  <Column xs={12} lg={4}>
                    <Text
                      style={{ paddingRight: '10px' }}
                      size={14}
                      weight={700}
                    >
                      Primary No
                    </Text>
                  </Column>
                  <Column xs={12} lg={4}>
                    <Text size={14}>00438947564</Text>
                  </Column>
                </Row>
                <SizedBox height={18} />
                <Row>
                  <Column xs={12} lg={4}>
                    <Text
                      style={{ paddingRight: '10px' }}
                      size={14}
                      weight={700}
                    >
                      Secondary No
                    </Text>
                  </Column>
                  <Column xs={12} lg={4}>
                    <Text size={14}>08064753028</Text>
                    <Text size={14}>08064753028</Text>
                    <Text size={14}>08064753028</Text>
                    <Text size={14}>08064753028</Text>
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
      </PageBody>
    </>
  );
};
