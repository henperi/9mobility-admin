import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';
import { paginationLimits } from '../../utils/paginationLimits';

import { SimpleTable } from '../../components/UiKit/Table';
import { generateShortId } from '../../utils/generateShortId';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { rem } from '../../utils/rem';
import { ReactComponent as UserImg } from '../../assets/images/users-admin-user.svg';
import { ToggleSwitch } from '../../components/UiKit/ToggleSwitch';
import { Button } from '../../components/UiKit/Button';
import { useFetch } from '../../hooks/useRequests';
import { IUser } from './interface';
import { TextField } from '../../components/UiKit/TextField';
import { Pagination } from '../../components/UiKit/Pagination';

export const UserDetails = () => {
  const [blockUser, setBlockUser] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data, loading } = useFetch<IUser>(
    `Mobility.AccountBackoffice/api/Airtime/GetTransfers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [activities, setActivities] = useState<
    (string | number | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result.results) {
      const result = data.result.results.map((r, i) =>
        Object.values({
          Date: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={12} md={8} lg={9}>
                <Text color={convertHexToRGBA(Colors.blackGrey, 0.4)}>
                  Aug 11, 2020
                </Text>
              </Column>
            </Row>
          ),
          Activity: <Text key={generateShortId()}>Login</Text>,
          Status: (
            <Button
              key={generateShortId()}
              style={{
                color: `${Colors.lightGreen}`,
                padding: `5px 20px`,
                minHeight: 'auto',
                background: `${convertHexToRGBA(Colors.yellowGreen, 0.15)}`,
              }}
            >
              <Text weight={600}>Success</Text>
            </Button>
          ),
          Time: (
            <Text
              color={convertHexToRGBA(Colors.blackGrey, 0.4)}
              key={generateShortId()}
            >
              14:54pm
            </Text>
          ),
        }),
      );

      setActivities(result);
    }
  }, [data?.result.results]);

  return (
    <>
      <TopBar name="User Details" />
      <PageBody>
        <Row childGap={10}>
          <Column xs={12} md={8}>
            <Card fullWidth style={{ padding: '3%' }}>
              <Row>
                <Column xs={12} md={2}>
                  <UserImg />
                </Column>
                <Column xs={12} md={10}>
                  <Text>Samuel Doe</Text>
                  <Text color={Colors.blackGrey}>samueldoe23@gmail.com</Text>
                  <SizedBox height={20} />
                  <Text color={Colors.blackGrey}>
                    Last login: Aug 19, 2019. 18:45Pm
                  </Text>
                </Column>
              </Row>
            </Card>

            <SizedBox height={20} />

            <Column>
              <Card style={{ padding: '1.5rem' }} fullWidth>
                <SimpleTable
                  scrollable
                  columns={['Date', 'Activity', 'Status', 'Time']}
                  loading={loading}
                  data={activities}
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
          </Column>
          <Column xs={12} md={4} lg={7} style={{ flex: '1' }}>
            <Card fullWidth>
              <Column
                style={{
                  backgroundColor: `${convertHexToRGBA(Colors.grey, 0.2)}`,
                  padding: rem(15),
                }}
              >
                <Row justifyContent="space-between">
                  <Text>Details</Text>
                  <Text>Edit</Text>
                </Row>
                <SizedBox height={20} />
                <Column>
                  <Text>Samuel Doe</Text>
                  <Text color={Colors.blackGrey}>samueldoe23@gmail.com</Text>
                  <Text color={Colors.blackGrey}>+2348032658965</Text>
                </Column>
              </Column>
              <SizedBox height={5} />
              <Column
                style={{
                  backgroundColor: `${convertHexToRGBA(Colors.grey, 0.2)}`,
                  padding: rem(15),
                }}
              >
                <Text> Reset Password</Text>
              </Column>
              <SizedBox height={5} />
              <Column
                style={{
                  backgroundColor: `${convertHexToRGBA(Colors.grey, 0.2)}`,
                  padding: rem(15),
                }}
              >
                <Row justifyContent="space-between">
                  <Text>Block User</Text>
                  <ToggleSwitch
                    id="block_User"
                    onChange={() => setBlockUser(!blockUser)}
                    checked={blockUser}
                  />
                </Row>
              </Column>
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
