import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

import { DateTime } from 'luxon';
import { useRouteMatch } from 'react-router-dom';
import { Card } from '../../../components/UiKit/Card';
import { Column } from '../../../components/UiKit/Column';
import { SimpleTable } from '../../../components/UiKit/Table';

import { Pagination } from '../../../components/UiKit/Pagination';
import { Row } from '../../../components/UiKit/Row';
import { SizedBox } from '../../../components/UiKit/SizedBox';
import { TextField } from '../../../components/UiKit/TextField';
import { useFetch } from '../../../hooks/useRequests';
import { paginationLimits } from '../../../utils/paginationLimits';
import { IDataTransfer } from '../../Data/interface';

export const CustomerDataUsage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { id } = useRouteMatch().params as any;

  const { data, loading } = useFetch<IDataTransfer>(
    `Mobility.AccountBackoffice/api/Airtime/GetTransfers?userId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [transfers, setTransfers] = useState<(string | number)[][]>();

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

      setTransfers(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <Column>
        <Card style={{ padding: '1.5rem' }} fullWidth>
          <SimpleTable
            loading={loading}
            columns={[
              'S//N',
              'Source MSSIDN',
              'Destination',
              'Amount',
              'Status',
              'Transfer type',
              'Transaction date',
            ]}
            data={transfers}
          />
          {data?.result.results?.length === 0 && 'No Data Usage at the moment'}

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
