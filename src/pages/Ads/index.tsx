import React from 'react';
// import { FaWallet } from 'react-icons/fa';

import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { SimpleTable } from '../../components/UiKit/Table';
import { generateShortId } from '../../utils/generateShortId';
import { Colors } from '../../themes/colors';

export const Ads = () => {
  return (
    <>
      <TopBar name="Ads" />
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
                'Image',
                'Add title',
                'Page Name',
                'Page ID',
                'Last Updated',
              ]}
              data={[
                [
                  <Card
                    key={generateShortId()}
                    color={Colors.lightBlue}
                    fullWidth
                  />,
                  'Title of this add',
                  'Airtime Page',
                  '1222EFEG',
                  'Aug, 20th, 14:54pm',
                ],
              ]}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
