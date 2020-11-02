import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
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
import { Pagination } from '../../components/UiKit/Pagination';
import { paginationLimits } from '../../utils/paginationLimits';
import { exportToExcel } from '../../utils/exportToExcel';

// import { ReactComponent as ArrowComponent } from '../../assets/images/arrowDown.svg';

// const Arrow = styled(ArrowComponent)<{
//   angle?: number;
// }>`
//   background-color: ${Colors.white};
//   border-radius: 4px;
//   // padding: 5px;
//   cursor: pointer;
//   box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
//   margin-right: 10px;
//   transform: ${({ angle }) => `rotate(${angle || 90}deg)`};

//   * {
//     color: ${Colors.blackGrey};
//   }
// `;

export const CustomerPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const url = `Mobility.OnboardingBackOffice/api/Users/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  const { data, loading } = useFetch<ICustomers>(`${url}`);

  const [customers, setCustomers] = useState<
    (string | number | JSX.Element)[][]
  >();

  const [onRowClick, setOnRowClick] = useState<(() => void)[] | (() => void)>();

  const history = useHistory();

  useEffect(() => {
    if (data?.result.results) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          'S/N': `${i + 1}.`,
          Name: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={12} md={2}>
                <Avatar />
              </Column>
              <Column useAppMargin xs={12} md={10}>
                <Text color={Colors.darkGreen} size={14} weight={700}>
                  {r.firstName} {r.lastName}
                </Text>
                <Text color="#8181A5" size={14}>
                  {r.email}
                </Text>
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
            <Button
              link
              color={Colors.darkGreen}
              key={generateShortId()}
              onClick={(e) => {
                history.push(`/customer/${r.id}`);
                e.stopPropagation();
              }}
            >
              View
            </Button>
          ),
        }),
      );

      setCustomers(result);

      const methods = data.result.results.map((r, i) => () =>
        history.push(`customer/${r.id}`),
      );

      setOnRowClick(methods);
    }
  }, [data?.result.results, history]);

  return (
    <>
      <TopBar name="Customers" />
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
                <TextField placeholder="Search Customers" />
              </Column>
            </Row>
          </Column>
          <Column useAppMargin xs={12} md={4} lg={2} justifyContent="flex-end">
            <Button
              onClick={() =>
                exportToExcel(`${url}&exportToExcel=true`, 'Customers')
              }
              fullWidth
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
