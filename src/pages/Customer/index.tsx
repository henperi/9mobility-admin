import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

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
import { ICustomers } from './interface';
import { useFetch } from '../../hooks/useRequests';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

export const CustomerPage = () => {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(20);

  const { data, loading } = useFetch<ICustomers>(
    `Mobility.OnboardingBackOffice/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [customers, setCustomers] = useState<
    (string | number | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results.length) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': `${i + 1}.`,
          Name: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={12} md={2}>
                <Avatar />
              </Column>
              <Column useAppMargin xs={12} md={10}>
                <Text color={Colors.darkGreen}>
                  {r.firstName} {r.lastName}
                </Text>
                <Text>{r.email}</Text>
              </Column>
            </Row>
          ),
          mobile: r.mobileNumber,
          wallet: (
            <Text
              style={{
                background: r.isWalletEnabled
                  ? 'rgba(0, 168, 17, 0.1)'
                  : convertHexToRGBA('#A80000', 0.1),
                padding: '0.5rem',
              }}
              key={generateShortId()}
              size={12}
              weight="bold"
              color={r.isWalletEnabled ? Colors.darkGreen : '#6A0000'}
            >
              {r.isWalletEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          ),
          acctID: r.mobileNumber,
          type: r.registeredThrough,
          action: (
            <Button link color={Colors.darkGreen} key={generateShortId()}>
              View
            </Button>
          ),
        }),
      );

      setCustomers(result);
    }
  }, [data?.result]);

  return (
    <>
      <TopBar name="Users" />
      <PageBody>
        <Row useAppMargin justifyContent="space-between">
          <Column fullHeight useAppMargin xs={12} md={6}>
            <Row useAppMargin>
              <Column useAppMargin xs={4} md={4}>
                <Button variant="default" fullWidth>
                  Filter
                </Button>
              </Column>
              <Column useAppMargin xs={8} md={8}>
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
                'Name',
                'Primary Number',
                'Wallet',
                'Acct ID',
                'Type',
                'Action',
              ]}
              data={customers}
              loading={loading}
            />
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
