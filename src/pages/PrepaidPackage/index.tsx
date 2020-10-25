import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

import { DateTime } from 'luxon';
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
import { useFetch } from '../../hooks/useRequests';
import { IPrepaidPackage } from './interface';

export const PrepaidPackage = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(25);

  const { data, loading } = useFetch<IPrepaidPackage>(
    `Mobility.AccountBackoffice/api/PrepaidPlans/Get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [prepaidPackages, setPrepaidPackages] = useState<
    (string | number | React.FC | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          planeName: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={4} md={2}>
                <Card color={Colors.lightBlue} fullWidth />
              </Column>
              <Column useAppMargin xs={8} md={10}>
                <Text color={Colors.lightGreen}>{r.name}</Text>
                <Text>{r.description}</Text>
              </Column>
            </Row>
          ),
          lastUpdated: DateTime.fromMillis(Date.now(), {
            locale: 'fr',
          }).toLocaleString(),
          view: (
            <Button size="small" outline key={generateShortId()}>
              View
            </Button>
          ),
        }),
      );

      setPrepaidPackages(result);
    }
  }, [data?.result.results]);

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3VyaWZvbGxAeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOlsiMSIsIjA4MDM3OTMxMjM0Il0sImVtYWlsIjoic3VyaWZvbGxAeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwODAzNzkzMTIzNCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiJ7XCJVc2VySWRcIjoxLFwiVXNlclR5cGVcIjpcIkJhY2tPZmZpY2VVc2VyXCIsXCJNb2JpbGVOdW1iZXJcIjpcIjA4MDM3OTMxMjM0XCIsXCJXYWxsZXRBY2NvdW50Tm9cIjpudWxsLFwiQ3VzdG9tZXJOYW1lXCI6XCJTdXJhaiBGZWhpbnRvbGFcIixcIlVzZXJFbWFpbFwiOlwic3VyaWZvbGxAeWFob28uY29tXCIsXCJEZXZpY2VDb2RlXCI6bnVsbH0iLCJuYmYiOjE2MDM2MzU4MjQsImV4cCI6MTYwMzc0MzgyNCwiaXNzIjoiaHR0cDovL3d3dy5tb2JpbGl0eS5uZyIsImF1ZCI6Imh0dHA6Ly93d3cubW9iaWxpdHkubmcifQ.lK6ROo38m1LPLVZls-ASHzeh_fSOXThmi3PLbyMDKnc

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
              data={prepaidPackages}
              loading={loading}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
