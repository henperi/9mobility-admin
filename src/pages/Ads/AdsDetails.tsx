import React from 'react';
// import { FaWallet } from 'react-icons/fa';
import { PageBody } from '../../components/UiKit/PageBody';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { Button } from '../../components/UiKit/Button/index';
import { TopBar } from '../../components/TopBar';
import { Text } from '../../components/UiKit/Text';
import { Card } from '../../components/UiKit/Card';
import { Column } from '../../components/UiKit/Column';
import { ReactComponent as AdPhone } from '../../assets/images/ad-phone.svg';

export const AdsDetails = () => {
  return (
    <>
      <TopBar name="Ads" />
      <Row
        style={{ width: '100%', padding: '21px', backgroundColor: '#FFFFFF' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Column xs={4} lg={4}>
          <Text>Airtel Ad 1</Text>
        </Column>
        <Column
          // style={{ display: 'flex' }}
          justifyContent="flex-end"
          xs={7}
          lg={7}
        >
          <Row>
            <Button
              style={{
                backgroundColor:
                  'linear-gradient(92.8deg, #006848 -48.47%, #B4C404 191.78%)',
              }}
            >
              Edit
            </Button>
            <Button
              variant="default"
              border
              style={{
                borderColor: '#1C1D21',
                borderRadius: '4px',
                borderWidth: '1px',
                margin: '0px 10px',
              }}
            >
              Pause Ad
            </Button>
            <Button
              variant="default"
              border
              style={{
                borderColor: '#1C1D21',
                borderRadius: '4px',
                borderWidth: '1px',
              }}
            >
              Delete Ad
            </Button>
          </Row>
        </Column>
      </Row>
      <PageBody>
        <Row justifyContent="space-between">
          <Column xs={12} lg={8}>
            <Row style={{ display: 'flex' }} justifyContent="space-between">
              <Column style={{ maxWidth: '550px' }} xs={12} lg={3}>
                <Text size={20}>Advert details</Text>
                <SizedBox height={5} />
                <Text size={14}>
                  Moreover the striking, brilliant and vivid colors
                </Text>
                <SizedBox height={27} />
              </Column>
              <Column xs={12} lg={8}>
                <Card
                  style={{ padding: '1.5rem', maxWidth: '600px' }}
                  fullWidth
                >
                  <Row justifyContent="space-between">
                    <Column xs={12} lg={8}>
                      <Text size={16}>Advert details</Text>
                      <SizedBox height={5} />
                      <Text size={14}>
                        Moreover the striking, brilliant and vivid colors
                      </Text>
                    </Column>
                    <Column xs={12} lg={2}>
                      <Text
                        size={14}
                        style={{ textAlign: 'right' }}
                        weight={700}
                        color="#006848"
                      >
                        Edit Ad
                      </Text>
                    </Column>
                  </Row>
                  <SizedBox height={20} />
                  <Row>
                    <Row>
                      <Text>Image: Selected Banner.Jpeg</Text>
                    </Row>
                    <SizedBox height={30} />
                    <Row style={{ width: '100%' }}>
                      <Row
                        style={{
                          width: '90%',
                          height: '73px',
                          background:
                            'linear-gradient(92.8deg, #006848 -48.47%, #B4C404 191.78%)',
                        }}
                      />
                    </Row>
                  </Row>
                </Card>
              </Column>
            </Row>
            <SizedBox height={32} />
            <SizedBox height={1} style={{ backgroundColor: '#ECECF2' }} />
            <SizedBox height={32} />
            <Row style={{ display: 'flex' }} justifyContent="space-between">
              <Column style={{ maxWidth: '550px' }} xs={12} lg={3}>
                <Text size={20}>Advert details</Text>
                <SizedBox height={5} />
                <Text size={14}>
                  Moreover the striking, brilliant and vivid colors
                </Text>
                <SizedBox height={27} />
              </Column>
              <Column xs={12} lg={8}>
                <Card
                  style={{ padding: '1.5rem', maxWidth: '600px' }}
                  fullWidth
                >
                  <Row justifyContent="space-between">
                    <Column xs={6} lg={8}>
                      <Text size={14}>Ad placement page</Text>
                      <SizedBox height={5} />
                      <Text size={14}>Data recharge Page</Text>
                    </Column>
                    <Column xs={6} lg={4}>
                      <Text
                        size={14}
                        style={{ textAlign: 'right' }}
                        weight={700}
                        color="#006848"
                      >
                        Edit Placement
                      </Text>
                    </Column>
                  </Row>
                  <SizedBox height={27} />
                  <Row>
                    <Column xs={12} lg={8}>
                      <Text size={14}>Page ID</Text>
                      <SizedBox height={5} />
                      <Text size={14}>5THGSO8UT</Text>
                    </Column>
                  </Row>
                </Card>
                <SizedBox height={27} />
              </Column>
            </Row>
          </Column>
          <Column xs={12} lg={3}>
            <Card style={{ padding: '22px', maxWidth: '700px' }}>
              <Text style={{ textAlign: 'center' }} weight={700} size={16}>
                Sample Ad placement
              </Text>
              <Column>
                <AdPhone />
              </Column>
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
