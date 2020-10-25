import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

import { DateTime } from 'luxon';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { SimpleTable } from '../../components/UiKit/Table';
import { Avatar } from '../../components/UiKit/Avatar';
import { generateShortId } from '../../utils/generateShortId';
import { useFetch } from '../../hooks/useRequests';
import { IAudit } from './interface';

export const Audit = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(25);

  const { data, loading } = useFetch<IAudit>(
    `Mobility.OnboardingBackOffice/api/Registration/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [audit, setAudit] = useState<
    (string | number | React.FC | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': i + 1,
          date: DateTime.fromMillis(Date.now(), {
            locale: 'fr',
          }).toLocaleString(),
          user: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={12} md={4} lg={3}>
                <Avatar image={r.photoUrl} />
              </Column>
              <Column useAppMargin xs={12} md={8}>
                <Text>
                  {r.firstName} {r.lastName}
                </Text>
              </Column>
            </Row>
          ),
          action: (
            <Text key={generateShortId()}>Updated a banner 8 hours ago</Text>
          ),
          status: (
            <Text
              style={{
                background: 'rgba(0, 168, 17, 0.1)',
                padding: '0.5rem',
              }}
              key={generateShortId()}
              size={12}
              weight="bold"
            >
              Success
            </Text>
          ),
          IP: '102.305.218.005',
        }),
      );

      setAudit(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <TopBar name="Audit" />
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
            <Button fullWidth>New User</Button>
          </Column>
        </Row>
        <SizedBox height={24} />
        <Column>
          <Card style={{ padding: '1.5rem' }} fullWidth>
            <SimpleTable
              loading={loading}
              columns={[
                'S//N',
                'Date',
                'User',
                'Action',
                'Status',
                'IP Address',
              ]}
              data={audit}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
