import React, { useEffect, useState } from 'react';

// import { DateTime } from 'luxon';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { SimpleTable } from '../../components/UiKit/Table';
import { IPaymentHistory } from './interface';
import { useFetch } from '../../hooks/useRequests';
import { Pagination } from '../../components/UiKit/Pagination';
import { paginationLimits } from '../../utils/paginationLimits';
import { exportToExcel } from '../../utils/exportToExcel';

export const PaymentHistory = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dates = {
    startDate: '10/08/2020',
    endDate: '10/10/2020',
  };

  const { data, loading } = useFetch<IPaymentHistory>(
    `Mobility.AccountBackoffice/api/TransactionHistories/GetTransactionHistory?startDate=${dates.startDate}&endDate=${dates.endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [paymentHistory, setPaymentHistory] = useState<
    (string | number | React.FC | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': i + 1,
          type: r.transactionTypeName,
          accountId: r.mobileNumber,
          channel: r?.channel || '',
          amount: r.transactionAmount,
          status: r.status,
          date: (
            <div>
              {/* {DateTime.fromRFC2822(r.dateCreated).toLocaleString(
                DateTime.DATE_MED,
              )}{' '} */}
              {`${r.dateCreated} `}
              <span style={{ whiteSpace: 'nowrap' }}>at {r.timeCreated}</span>
            </div>
          ),
        }),
      );

      setPaymentHistory(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <TopBar name="Payment History" />
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
                  `Mobility.AccountBackoffice/api/TransactionHistories/GetTransactionHistory?startDate=${dates.startDate}&exportToExcel=true`,
                  'PaymentHistory',
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
              columns={[
                'S/N',
                'Transaction Type',
                'Account ID',
                'Channel',
                'Amount',
                'Status',
                'Transaction date',
              ]}
              data={paymentHistory}
              loading={loading}
              scrollable
            />
            {data?.result.results?.length === 0 &&
              'No payment history at the moment'}

            <SizedBox height={20} />

            {data && data.result.results.length > 0 && (
              <Row useAppMargin justifyContent="space-between">
                <Column xs={4} md={2}>
                  <TextField
                    leftIcon="Show:"
                    placeholder={`${pageSize}`}
                    dropDown
                    dropDownOptions={paginationLimits}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  />
                </Column>
                <Column
                  xs={12}
                  md={8}
                  fullHeight
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Pagination
                    breakLabel="..."
                    pageCount={data.result.totalNumberOfPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) => setPageNumber(e.selected + 1)}
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                </Column>
              </Row>
            )}
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
