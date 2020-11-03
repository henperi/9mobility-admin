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
import { ToggleSwitch } from '../../components/UiKit/ToggleSwitch';
import { Button } from '../../components/UiKit/Button';
import { useFetch, usePost } from '../../hooks/useRequests';
import { ISingleUser, IUserLogins } from './interface';
import { Pagination } from '../../components/UiKit/Pagination';
import { TextField } from '../../components/UiKit/TextField';
import { paginationLimits } from '../../utils/paginationLimits';
// import { ReactComponent as PasswordResetIcon } from '../../assets/images/password-reset-icon.svg';
import { Avatar } from '../../components/UiKit/Avatar';
import { Spinner } from '../../components/UiKit/Spinner';
import { logger } from '../../utils/logger';

export const UserDetails = () => {
  const [activeUser, setActiveUser] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { id } = useRouteMatch().params as any;

  const { data } = useFetch<ISingleUser>(
    `Mobility.OnboardingBackOffice/api/Admins/GetUser?id=${id}`,
  );

  const [toggleUserStatus, { loading: toggling }] = usePost<ISingleUser>(
    `Mobility.OnboardingBackOffice/api/Admins/ToggleActive?id=${id}`,
  );

  const { data: loginData, loading: loginLoading } = useFetch<IUserLogins>(
    `Mobility.OnboardingBackOffice/api/Admins/GetBackOfficeUserLogins?userId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  const [activities, setActivities] = useState<
    (string | number | JSX.Element)[][]
  >();

  const processToggle = async () => {
    try {
      const response = await toggleUserStatus();
      if (response.data) {
        if (response?.data?.result?.isActive) {
          setActiveUser(true);
        } else {
          setActiveUser(false);
        }
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  useEffect(() => {
    if (data) {
      setActiveUser(data.result.isActive);
    }
  }, [data]);

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
              <Row childGap={10}>
                <Column xs={12} md={2} alignItems="center">
                  <Avatar
                    style={{
                      borderRadius: `${rem(5)}`,
                      width: '100%',
                      height: 'auto',
                      background: 'none',
                    }}
                    image="https://png.pngitem.com/pimgs/s/421-4212341_default-avatar-svg-hd-png-download.png"
                  />
                </Column>
                <Column
                  xs={12}
                  md={10}
                  style={{ flex: '1' }}
                  alignItems="center"
                >
                  <Text>
                    {data?.result?.firstName}&nbsp;{data?.result?.lastName}
                  </Text>
                  <Text color={Colors.blackGrey}>{data?.result?.email}</Text>
                  <SizedBox height={20} />
                  <Text color={Colors.blackGrey}>Last login:</Text>
                </Column>
              </Row>
            </Card>

            <SizedBox height={20} />

            <Card style={{ padding: '1.5rem' }} fullWidth>
              <SimpleTable
                scrollable
                columns={['Date', 'Activity', 'Status', 'Time']}
                loading={loginLoading}
                data={activities}
                style={{ display: 'inline-table' }}
              />

              {loginData?.result.results.length ? (
                <Row useAppMargin justifyContent="space-between">
                  <Column xs={12} lg={3}>
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
                    lg={9}
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
              ) : (
                !loginLoading && (
                  <Text color={`${convertHexToRGBA(Colors.blackGrey, 0.7)}`}>
                    No login activities for this user at the moment
                  </Text>
                )
              )}
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
              {/* <Column
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
              <SizedBox height={5} /> */}
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
                    onChange={processToggle}
                    checked={activeUser}
                  />
                </Row>
                <Row justifyContent="center">
                  {toggling && <Spinner size={20} />}
                </Row>
              </Column>
            </Card>
          </Column>
        </Row>
      </PageBody>
    </>
  );
};
