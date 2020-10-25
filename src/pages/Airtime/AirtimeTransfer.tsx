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
import { IAirtimeTransfer } from './interface';
import { useFetch } from '../../hooks/useRequests';

export const AirtimeTransfer = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(25);

  const { data, loading } = useFetch<IAirtimeTransfer>(
    `Mobility.AccountBackoffice/api/Airtime/GetTransfers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [purchases, setPurchases] = useState<(string | number)[][]>();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': i + 1,
          sourceMobile: r.sourceMobileNumber,
          destination: r.recipientMobileNumber,
          amount: r.amount,
          status: r.transactionStatusName,
          type: 'r.type',
          date: DateTime.fromISO(r.createdDate, {
            locale: 'fr',
          }).toLocaleString(),
        }),
      );

      setPurchases(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <TopBar name="Airtime Transfer" />
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
          <Column useAppMargin xs={12} md={4} lg={2} justifyContent="flex-end">
            <Button fullWidth>Export CSV</Button>
          </Column>
        </Row>
        <SizedBox height={24} />
        <Column>
          <Card style={{ padding: '1.5rem' }} fullWidth>
            <SimpleTable
              scrollable
              columns={[
                'S//N',
                'Source MSSIDN',
                'Destination',
                'Amount',
                'Status',
                'Transfer type',
                'Transaction date',
              ]}
              data={purchases}
              loading={loading}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
