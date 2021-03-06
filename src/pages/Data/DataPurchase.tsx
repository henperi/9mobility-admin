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
import { useFetch } from '../../hooks/useRequests';
import { IDataPurchase } from './interface';
import { Pagination } from '../../components/UiKit/Pagination';
import { paginationLimits } from '../../utils/paginationLimits';
import { exportToExcel } from '../../utils/exportToExcel';
import { Drawer } from '../../components/RightDrawer';
import { Text } from '../../components/UiKit/Text';

export const DataPurchase = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, loading } = useFetch<IDataPurchase>(
    `Mobility.AccountBackoffice/api/Data/GetPurchase?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [dataPurchase, setDataPurchase] = useState<(string | number)[][]>();

  const [showDrawer, setShowDrawer] = useState(false);
  const [onRowClick, setOnRowClick] = useState<(() => void)[] | (() => void)>();

  const [drawerData, setDrawerData] = useState<
    IDataPurchase['result']['results'][0]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': i + 1,
          accountId: r.mobileNumber,
          channel: r?.channel || '',
          amount: r.amount,
          status: r.transactionStatusName,
          // purchaseType: '',
          date: DateTime.fromISO(r.createdDate, {
            locale: 'ng',
          }).toLocaleString(DateTime.DATETIME_MED),
        }),
      );

      setDataPurchase(result);

      const methods = data.result.results.map((r, i) => () => {
        setShowDrawer(true);
        setDrawerData(r);
      });

      setOnRowClick(methods);
    }
  }, [data?.result]);
  return (
    <>
      <TopBar name="Data Purchase" />
      <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer}>
        {drawerData && (
          <>
            <Text>Data Purchase Details</Text>
            <SizedBox height={70} />
            <Row useAppMargin>
              <Column useAppMargin xs={6} style={{ marginBottom: '40px' }}>
                <Text color="#8181A5" size={14} variant="lighter">
                  Account ID
                </Text>
                <Text>{drawerData.mobileNumber}</Text>
              </Column>
              <Column useAppMargin xs={6} style={{ marginBottom: '40px' }}>
                <Text color="#8181A5" size={14} variant="lighter">
                  Transaction Amount(MB)
                </Text>
                <Text>{drawerData.amount}</Text>
              </Column>
              <Column useAppMargin xs={6} style={{ marginBottom: '40px' }}>
                <Text color="#8181A5" size={14} variant="lighter">
                  Status
                </Text>
                <Text>{drawerData.transactionStatusName}</Text>
              </Column>
              <Column useAppMargin xs={6} style={{ marginBottom: '40px' }}>
                <Text color="#8181A5" size={14} variant="lighter">
                  Transaction Date
                </Text>
                <Text>
                  {DateTime.fromISO(drawerData.createdDate, {
                    locale: 'ng',
                  }).toLocaleString(DateTime.DATETIME_MED)}
                </Text>
              </Column>
            </Row>
          </>
        )}
      </Drawer>

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
                  `Mobility.AccountBackoffice/api/Data/GetPurchase?pageNumber=${pageNumber}&pageSize=${pageSize}&exportToExcel=true`,
                  'DataPurchases',
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
              scrollable
              loading={loading}
              columns={[
                'S//N',
                'Account ID',
                'Channel',
                'Amount',
                'Status',
                // 'Purchase Type',
                'Transaction date',
              ]}
              data={dataPurchase}
              onRowClick={onRowClick}
            />

            <SizedBox height={20} />

            {data?.result.results && (
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
