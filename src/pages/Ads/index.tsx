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
import { IAds } from './interface';
import { useFetch } from '../../hooks/useRequests';
import { exportToExcel } from '../../utils/exportToExcel';

export const Ads = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(25);

  const { data, loading } = useFetch<IAds>(
    `Mobility.AccountBackoffice/api/Ads/GetAds?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [ads, setAds] = useState<
    (string | number | React.FC | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          image: (
            <Card key={generateShortId()} color={Colors.lightBlue} fullWidth />
          ),
          title: r.name,
          pageDescription: r.description,
          pageId: r.pageId,
          lastUpdated: DateTime.fromMillis(Date.now(), {
            locale: 'fr',
          }).toLocaleString(),
        }),
      );

      setAds(result);
    }
  }, [data?.result.results]);
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
            <Button
              fullWidth
              onClick={() =>
                exportToExcel(
                  `Mobility.AccountBackoffice/api/Ads/GetAds?pageNumber=${pageNumber}&pageSize=${pageSize}&exportToExcel=true`,
                  'Ads',
                )
              }
            >
              Export CSV
            </Button>
          </Column>
        </Row>
        <SizedBox height={24} />
        <Column>
          <Card style={{ padding: '1.5rem' }} fullWidth>
            <SimpleTable
              // scrollable
              loading={loading}
              columns={[
                'Image',
                'Add title',
                'Page Name',
                'Page ID',
                'Last Updated',
              ]}
              data={ads}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
