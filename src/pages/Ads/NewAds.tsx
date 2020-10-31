import React from 'react';
// import { FaWallet } from 'react-icons/fa';
import { PageBody } from '../../components/UiKit/PageBody';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { TextField } from '../../components/UiKit/TextField';
import { TopBar } from '../../components/TopBar';
import { Row } from '../../components/UiKit/Row';
import { Button } from '../../components/UiKit/Button';
import { Text } from '../../components/UiKit/Text';
import { Card } from '../../components/UiKit/Card';
import { Column } from '../../components/UiKit/Column';
import { ReactComponent as AdPhone } from '../../assets/images/ad-phone.svg';
import { ReactComponent as ImageUpload } from '../../assets/images/upload-image-icon.svg';

export const NewAds = () => {
  return (
    <>
      <TopBar name="Ads" />
      <Row
        style={{ width: '100%', padding: '21px', backgroundColor: '#FFFFFF' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Column xs={4} lg={4}>
          <Text>New Advert</Text>
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
              Post Advert
            </Button>
          </Row>
        </Column>
      </Row>
      <PageBody>
        <Row>
          <Column style={{ marginRight: '24px' }} xs={12} lg={6}>
            <Card style={{ width: '100%' }}>
              <form>
                <TextField
                  label="Ad Name"
                  placeholder="Enter Ad Name"
                  type="text"
                  required
                />
                <TextField
                  label="Ad Description"
                  placeholder="Enter your ad description"
                  required
                />
                <TextField
                  label="Ad Description"
                  placeholder="Enter your ad description"
                  required
                />
                <Column>
                  <Text style={{ fontSize: '0.74rem', color: '#627382' }}>
                    Ad Placement
                  </Text>
                  <SizedBox height={8} />
                  <Row
                    alignItems="center"
                    style={{
                      height: '158px',
                      border: '2px dashed #ECECF2',
                      textAlign: 'center',
                    }}
                  >
                    <Column style={{ alignItems: 'center' }}>
                      <ImageUpload />
                      <SizedBox height={10} />
                      <Text weight={700}>Drag your files here to upload</Text>
                      <SizedBox height={4} />
                      <Text>or click to browse</Text>
                    </Column>
                  </Row>
                </Column>
                <SizedBox height={25} />
                <Text weight={700}>Ad Placement</Text>
                <SizedBox height={6} />
                <TextField dropDown label="Ad Name" />
              </form>
            </Card>
            <SizedBox height={30} />
          </Column>
          <SizedBox height={30} />
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
