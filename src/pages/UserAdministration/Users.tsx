import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from '../../components/UiKit/Row';
import { Button } from '../../components/UiKit/Button';
import { Card } from '../../components/UiKit/Card';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { TextField } from '../../components/UiKit/TextField';
import { SimpleTable } from '../../components/UiKit/Table';
import { Pagination } from '../../components/UiKit/Pagination';
import { paginationLimits } from '../../utils/paginationLimits';
import { useFetch } from '../../hooks/useRequests';
import { IUser } from './interface';
import { Text } from '../../components/UiKit/Text';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { generateShortId } from '../../utils/generateShortId';
import { Colors } from '../../themes/colors';
import { Avatar } from '../../components/UiKit/Avatar';
import { rem } from '../../utils/rem';

export const Users = () => {
  const history = useHistory();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data, loading } = useFetch<IUser>(
    `Mobility.OnboardingBackOffice/api/Admins/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [users, setUsers] = useState<(string | number | JSX.Element)[][]>();

  useEffect(() => {
    if (data?.result.results) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': `${i + 1}.`,
          Name: (
            <Row alignItems="center" childGap={10}>
              <Avatar
                style={{ width: rem(50), height: 'auto' }}
                image={r.photoUrl}
              />
              <Text style={{ flex: '1' }}>
                {r.firstName} {r.lastName}
              </Text>
            </Row>
          ),
          email: r.email,
          lastLogin: r.lastLoginDate || '',
          status: (
            <Text
              style={{
                background: r.isActive
                  ? 'rgba(0, 168, 17, 0.1)'
                  : convertHexToRGBA('#A80000', 0.1),
                padding: '0.5rem',
              }}
              key={generateShortId()}
              size={12}
              weight="bold"
              color={r.isActive ? Colors.darkGreen : '#6A0000'}
            >
              {r.isActive ? 'Enabled' : 'Disabled'}
            </Text>
          ),
          role: r.roleId,
          action: (
            <Button link color={Colors.darkGreen} key={generateShortId()}>
              View
            </Button>
          ),
        }),
      );

      setUsers(result);

      const methods = data.result.results.map((r, i) => () =>
        history.push(`user-administration/${r.id}`),
      );

      setOnRowClick(methods);
    }
  }, [data?.result.results, history]);

  const [onRowClick, setOnRowClick] = useState<(() => void)[] | (() => void)>();

  return (
    <React.Fragment>
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
              'Last Login',
              'Status',
              'Role',
              'Action',
            ]}
            loading={loading}
            data={users}
            onRowClick={onRowClick}
          />
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
        </Card>
      </Column>
    </React.Fragment>
  );
};
