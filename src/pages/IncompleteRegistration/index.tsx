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
import { Text } from '../../components/UiKit/Text';
import { generateShortId } from '../../utils/generateShortId';
import { IRegNotcomplete } from './interface';
import { useFetch } from '../../hooks/useRequests';
import { exportToExcel } from '../../utils/exportToExcel';
import { Pagination } from '../../components/UiKit/Pagination';
import { paginationLimits } from '../../utils/paginationLimits';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { Colors } from '../../themes/colors';

export const IncompleteRegistration = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, loading } = useFetch<IRegNotcomplete>(
    `Mobility.OnboardingBackOffice/api/Users/GetUsersButInCompleteRegistration?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [incompleteReg, setIncompleteReg] = useState<
    (string | number | React.FC | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': i + 1,
          MSSIDN: r.mobileNumber,
          otp: (
            <Text
              style={{
                background: r.otp
                  ? 'rgba(0, 168, 17, 0.1)'
                  : convertHexToRGBA(Colors.error, 0.4),
                padding: '0.5rem 2rem',
              }}
              key={generateShortId()}
              size={12}
              weight="bold"
            >
              {r.otp ? 'Sent' : 'Not Sent'}
            </Text>
          ),
          Status: r.status,
          date: DateTime.fromISO(r.dateRegistered, {
            locale: 'ng',
          }).toLocaleString(DateTime.DATETIME_MED),
        }),
      );

      setIncompleteReg(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <TopBar
        name={`Incomplete User Registration ${
          data?.result.totalNumberOfRecords || '-'
        }`}
      />
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
                  `Mobility.OnboardingBackOffice/api/Users/GetUsersButInCompleteRegistration?pageNumber=${pageNumber}&exportToExcel=true`,
                  'IncompleteRegistration',
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
              columns={['S//N', 'MSSIDN', 'OTP', 'Status', 'Date Registered']}
              data={incompleteReg}
              loading={loading}
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
