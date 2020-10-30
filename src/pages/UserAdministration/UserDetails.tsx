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
import { ISingleUser } from './interface';

export const UserDetails = () => {
  const [blockUser, setBlockUser] = useState(false);

  const { id } = useRouteMatch().params as any;

  const { data, loading } = useFetch<ISingleUser>(
    `Mobility.OnboardingBackOffice/api/Admins/GetUser?id=${id}`,
  );

  const [activities, setActivities] = useState<
    (string | number | JSX.Element)[][]
  >();

  useEffect(() => {
    if (data?.result) {
      const result = data?.result?.backOfficeUserRoleDetailModels.map((r, i) =>
        Object.values({
          Role: (
            <Row useAppMargin key={generateShortId()} alignItems="center">
              <Column useAppMargin xs={12} md={8} lg={9}>
                <Text color={convertHexToRGBA(Colors.blackGrey, 0.4)}>
                  {r.roleName}
                </Text>
              </Column>
            </Row>
          ),
          Username: <Text key={generateShortId()}>{r.userName}</Text>,
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
              <Text weight={600}>{r.isActive}</Text>
            </Button>
          ),
        }),
      );

      setActivities(result);
    }
  }, [data?.result]);

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

            <Column>
              <Card style={{ padding: '1.5rem' }} fullWidth>
                <SimpleTable
                  scrollable
                  columns={['Role', 'Username', 'Status']}
                  loading={loading}
                  data={activities}
                />
                {data?.result?.backOfficeUserRoleDetailModels?.length ===
                  undefined && (
                  <Text color={`${convertHexToRGBA(Colors.blackGrey, 0.7)}`}>
                    No roles for this user at the moment
                  </Text>
                )}
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
