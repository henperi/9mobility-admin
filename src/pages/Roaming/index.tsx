import React, { useEffect, useState } from 'react';

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
import { IRoaming } from './interface';
import { paginationLimits } from '../../utils/paginationLimits';
import { Pagination } from '../../components/UiKit/Pagination';
import { exportToExcel } from '../../utils/exportToExcel';

export const Roaming = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data, loading } = useFetch<IRoaming>(
    `Mobility.AccountBackoffice/api/RoamingRates/Get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [roamingRates, setRoamingRates] = useState<
    (string | number | React.FC | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result?.results?.length) {
      const result = data.result?.results.map((r, i) =>
        Object.values({
          serialNumber: r.id,
          country: r.country,
          ISO: '',
          operator: r.operator,
          callRateToNigeria: r.callRateToNigeria,
          callRateWithinLocation: r.callRateWithinLocation,
          textingNigeria: '',
          smsRate: r.smsRate,
          receivingRateNigeria: '',
          receivingCallRate: r.receivingCallRate,
          charge: '',
          package: '',
        }),
      );

      // 'S//N',
      // 'Country',
      // 'ISO',
      // 'Roaming Ntw. Name',
      // 'Calling Nigeria',
      // 'Calling Local No.',
      // 'Texting Nigeria',
      // 'Texting Local No.',
      // 'Receive Nigeria call',
      // 'Receive Local call',
      // 'Charge',
      // 'Package',

      setRoamingRates(result);
    }
  }, [data?.result?.results]);

  return (
    <>
      <TopBar name="Roaming" />
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
                  'RoamingRates',
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
                'S//N',
                'Country',
                'ISO',
                'Roaming Ntw. Name',
                'Calling Nigeria',
                'Calling Local No.',
                'Texting Nigeria',
                'Texting Local No.',
                'Receive Nigeria call',
                'Receive Local call',
                'Charge',
                'Package',
              ]}
              data={roamingRates}
              loading={loading}
              scrollable
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
