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
import { Text } from '../../components/UiKit/Text';

export const PrepaidPackage = () => {
  return (
    <>
      <TopBar name="Prepaid Package" />
      <PageBody>
        <Row useAppMargin justifyContent="space-between">
          <Column fullHeight useAppMargin xs={12} md={6}>
            <Row useAppMargin>
              <Column useAppMargin xs={6} md={8}>
                <TextField placeholder="Search Package" />
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
              columns={['Plane Name', 'Last Updated']}
              data={[
                [
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={4} md={2}>
                      <Card color={Colors.lightBlue} fullWidth />
                    </Column>
                    <Column useAppMargin xs={8} md={10}>
                      <Text color={Colors.lightGreen}>Moreflex</Text>
                      <Text>25k/s to all networks</Text>
                    </Column>
                  </Row>,
                  'Aug, 20th, 14:54pm',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={4} md={2}>
                      <Card color={Colors.lightBlue} fullWidth />
                    </Column>
                    <Column useAppMargin xs={8} md={10}>
                      <Text color={Colors.lightGreen}>Moreflex</Text>
                      <Text>25k/s to all networks</Text>
                    </Column>
                  </Row>,
                  'Aug, 20th, 14:54pm',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={4} md={2}>
                      <Card color={Colors.lightBlue} fullWidth />
                    </Column>
                    <Column useAppMargin xs={8} md={10}>
                      <Text color={Colors.lightGreen}>Moreflex</Text>
                      <Text>25k/s to all networks</Text>
                    </Column>
                  </Row>,
                  'Aug, 20th, 14:54pm',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={4} md={2}>
                      <Card color={Colors.lightBlue} fullWidth />
                    </Column>
                    <Column useAppMargin xs={8} md={10}>
                      <Text color={Colors.lightGreen}>Moreflex</Text>
                      <Text>25k/s to all networks</Text>
                    </Column>
                  </Row>,
                  'Aug, 20th, 14:54pm',
                  <Button size="small" outline key={generateShortId()}>
                    View
                  </Button>,
                ],
                [
                  <Row useAppMargin key={generateShortId()} alignItems="center">
                    <Column useAppMargin xs={4} md={2}>
                      <Card color={Colors.lightBlue} fullWidth />
                    </Column>
                    <Column useAppMargin xs={8} md={10}>
                      <Text color={Colors.lightGreen}>Moreflex</Text>
                      <Text>25k/s to all networks</Text>
                    </Column>
                  </Row>,
                  'Aug, 20th, 14:54pm',
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
