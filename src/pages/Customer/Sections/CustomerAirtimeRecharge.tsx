import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

import { useRouteMatch } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Card } from '../../../components/UiKit/Card';
import { Column } from '../../../components/UiKit/Column';
import { SimpleTable } from '../../../components/UiKit/Table';

import { TextField } from '../../../components/UiKit/TextField';
import { useFetch } from '../../../hooks/useRequests';
import { paginationLimits } from '../../../utils/paginationLimits';
import { IAirtimePurchase } from '../../Airtime/interface';
import { Pagination } from '../../../components/UiKit/Pagination';
import { Row } from '../../../components/UiKit/Row';
import { SizedBox } from '../../../components/UiKit/SizedBox';

export const CustomerAirtimeRecharge = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { id } = useRouteMatch().params as any;

  const { data, loading } = useFetch<IAirtimePurchase>(
    `Mobility.AccountBackoffice/api/Airtime/GetPurchases?userId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [recharge, setRecharge] = useState<(string | number)[][]>();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': i + 1,
          mobile: r.mobileNumber,
          channel: r.beneficiaryTypeName,
          amount: r.amount,
          status: r.transactionStatusName,
          date: DateTime.fromISO(r.createdDate, {
            locale: 'fr',
          }).toLocaleString(),
        }),
      );

      setRecharge(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <Column>
        <Card style={{ padding: '1.5rem' }} fullWidth>
          <SimpleTable
            columns={[
              'S/N',
              'Account ID',
              'Channel',
              'Amount',
              'Status',
              'Transaction date',
            ]}
            data={recharge}
            loading={loading}
          />

          {data?.result.results?.length === 0 && 'No transfers at the moment'}

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
    </>
  );
};
