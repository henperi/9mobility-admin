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

export const IncompleteRegistration = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(20);

  const { data, loading } = useFetch<IRegNotcomplete>(
    `Mobility.OnboardingBackOffice/GetUsersButInCompleteRegistration?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
                background: 'rgba(0, 168, 17, 0.1)',
                padding: '0.5rem 2rem',
              }}
              key={generateShortId()}
              size={12}
              weight="bold"
            >
              Sent
            </Text>
          ),
          Status: 'Pending',
          date: DateTime.fromMillis(Date.now(), {
            locale: 'fr',
          }).toLocaleString(),
        }),
      );

      setIncompleteReg(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <TopBar name="Incomplete Registration (23,0000)" />
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
            <Button fullWidth>Export CSV</Button>
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
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
