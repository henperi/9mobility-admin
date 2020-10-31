import React, { useEffect, useState } from 'react';
// import { FaWallet } from 'react-icons/fa';

import { useRouteMatch } from 'react-router-dom';
import { Card } from '../../components/UiKit/Card';
import { PageBody } from '../../components/UiKit/PageBody';
import { Text } from '../../components/UiKit/Text';
import { Column } from '../../components/UiKit/Column';
import { SizedBox } from '../../components/UiKit/SizedBox';
import { Row } from '../../components/UiKit/Row';
import { TopBar } from '../../components/TopBar';

import { SimpleTable } from '../../components/UiKit/Table';
import { generateShortId } from '../../utils/generateShortId';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { rem } from '../../utils/rem';
import { ReactComponent as UserImg } from '../../assets/images/users-admin-user.svg';
import { ToggleSwitch } from '../../components/UiKit/ToggleSwitch';
import { Button } from '../../components/UiKit/Button';
import { useFetch } from '../../hooks/useRequests';
import { ISingleUser, IUserLogins } from './interface';
import { Pagination } from '../../components/UiKit/Pagination';
import { TextField } from '../../components/UiKit/TextField';
import { paginationLimits } from '../../utils/paginationLimits';
import { ReactComponent as PasswordResetIcon } from '../../assets/images/password-reset-icon.svg';

export const UserDetails = () => {
  const [blockUser, setBlockUser] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { id } = useRouteMatch().params as any;

  const { data } = useFetch<ISingleUser>(
    `Mobility.OnboardingBackOffice/api/Admins/GetUser?id=${id}`,
  );

  const { data: loginData, loading: loginLoading } = useFetch<IUserLogins>(
    `Mobility.OnboardingBackOffice/api/Admins/GetBackOfficeUserLogins?userId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [activities, setActivities] = useState<
    (string | number | JSX.Element)[][]
  >();

  useEffect(() => {
    if (loginData?.result) {
      const result = loginData?.result?.results.map((r, i) =>
        Object.values({
          Date: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={12} md={8} lg={9}>
                <Text color={convertHexToRGBA(Colors.blackGrey, 0.4)}>
                  {r.date}
                </Text>
              </Column>
            </Row>
          ),
          Activity: <Text key={generateShortId()}>{r.activity}</Text>,
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
              <Text weight={600}>{r.status}</Text>
            </Button>
          ),
          Time: r.time,
        }),
      );

      setActivities(result);
    }
  }, [loginData?.result]);

  return (
    <>
      <TopBar name="User Details" />
      <PageBody>
        <Row childGap={10}>
          <Column lg={8} md={12}>
            <Card fullWidth style={{ padding: '3%' }}>
              <Row>
                <Column xs={12} md={2}>
                  <UserImg />
                </Column>
                <Column xs={12} md={10}>
                  <Text>
                    {data?.result?.firstName}&nbsp;{data?.result?.lastName}
                  </Text>
                  <Text color={Colors.blackGrey}>{data?.result?.email}</Text>
                  <SizedBox height={20} />
                  <Text color={Colors.blackGrey}>
                    Last login: Aug 19, 2019. 18:45Pm
                  </Text>
                </Column>
              </Row>
            </Card>

            <SizedBox height={20} />

            <Card style={{ padding: '1.5rem' }} fullWidth>
              <Column xs={12}>
                <SimpleTable
                  scrollable
                  columns={['Date', 'Activity', 'Status', 'Time']}
                  loading={loginLoading}
                  data={activities}
                />
                {data?.result?.backOfficeUserRoleDetailModels?.length ===
                  undefined &&
                  !loginLoading && (
                    <Text color={`${convertHexToRGBA(Colors.blackGrey, 0.7)}`}>
                      No roles for this user at the moment
                    </Text>
                  )}
              </Column>

              <Column xs={12}>
                {loginData?.result.results && (
                  <Row useAppMargin justifyContent="space-between">
                    <Column xs={4} md={3}>
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
                      md={9}
                      fullHeight
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Pagination
                        breakLabel="..."
                        pageCount={loginData?.result?.totalNumberOfPages}
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
                  <Text>
                    {data?.result?.firstName}&nbsp;{data?.result?.lastName}
                  </Text>
                  <Text color={Colors.blackGrey}>{data?.result?.email}</Text>
                  <Text color={Colors.blackGrey}>
                    {data?.result?.mobileNumber}
                  </Text>
                </Column>
              </Column>
              <SizedBox height={5} />
              <Column
                style={{
                  backgroundColor: `${convertHexToRGBA(Colors.grey, 0.2)}`,
                  padding: rem(15),
                }}
              >
                <Row alignItems="center">
                  <Card
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: rem(10),
                      borderRadius: rem(10),
                      background: convertHexToRGBA(Colors.lightBlue, 0.1),
                    }}
                  >
                    <PasswordResetIcon />
                  </Card>
                  <SizedBox width={30} />
                  <Text> Reset Password</Text>
                </Row>
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
