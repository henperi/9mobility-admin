import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/UiKit/Button';
import { TextField } from '../../components/UiKit/TextField';
import { SimpleTable } from '../../components/UiKit/Table';
import { Pagination } from '../../components/UiKit/Pagination';
import { IUser } from './interface';
import { useFetch } from '../../hooks/useRequests';
import { paginationLimits } from '../../utils/paginationLimits';
import { Text } from '../../components/UiKit/Text';
import { generateShortId } from '../../utils/generateShortId';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

export const UserAdministration = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data, loading } = useFetch<IUser>(
    `Mobility.OnboardingBackOffice/api/Users/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [users, setUsers] = useState<(string | number | JSX.Element)[][]>();

  const history = useHistory();

  useEffect(() => {
    if (data?.result.results) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': `${i + 1}.`,
          Name: `${r.firstName} ${r.lastName}`,
          email: r.email,
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

      setUsers(result);

      const methods = data.result.results.map((r, i) => () =>
        history.push(`user/${r.id}`),
      );

      setOnRowClick(methods);
    }
  }, [data?.result.results, history]);

  const [onRowClick, setOnRowClick] = useState<(() => void)[] | (() => void)>();

  return (
    <>
      <TopBar name="User Administration" />
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
              scrollable
              columns={[
                'S//N',
                'Name',
                'Email',
                'Wallet',
                'Account ID',
                'Role',
                'Action',
              ]}
              loading={loading}
              data={users}
              onRowClick={onRowClick}
            />
          </Card>
        </Column>
        <Column>
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
        </Column>
      </PageBody>
    </>
  );
};
