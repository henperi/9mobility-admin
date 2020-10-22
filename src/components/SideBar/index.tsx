import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';
import { ReactComponent as Logo } from '../../assets/images/9mobility-logo.svg';
import { rem } from '../../utils/rem';
import { Card } from '../UiKit/Card';
import { Column } from '../UiKit/Column';
import { Text } from '../UiKit/Text';
import { Colors } from '../../themes/colors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { SizedBox } from '../UiKit/SizedBox';
import { Row } from '../UiKit/Row';
import { Avatar } from '../UiKit/Avatar';
import { useGlobalStore } from '../../store';

import { ReactComponent as HomeIcon } from '../../assets/images/homeIcon.svg';
import { ReactComponent as AirtimeIcon } from '../../assets/images/airtimeIcon.svg';
import { ReactComponent as CallHistoryIcon } from '../../assets/images/callHistoryIcon.svg';
import { ReactComponent as DataIcon } from '../../assets/images/dataIcon.svg';
import { ReactComponent as DataUsage } from '../../assets/images/dataUsageIcon.svg';
import { ReactComponent as TimeIcon } from '../../assets/images/timeIcon.svg';
import { ReactComponent as PrepaidPlanIcon } from '../../assets/images/prepaidPlanIcon.svg';
import { ReactComponent as PostPaidIcon } from '../../assets/images/postPaidIcon.svg';
import { ReactComponent as RoamingIcon } from '../../assets/images/roamingIcon.svg';
import { ReactComponent as SubscribedIcon } from '../../assets/images/subscribedIcon.svg';
import { useFetch } from '../../hooks/useRequests';
import { Spinner } from '../UiKit/Spinner';

interface AirtimeDataResp {
  result: {
    mobileNumber: string;
    airtimeModel: {
      balance: string;
      bonusBalance: string;
      subscriberType: 'PREPAID' | 'POSTPAID' | 'HYBRID';
      creditLimit: string;
      creditUsage: string;
    };
    dataModel: {
      balance: string;
      bonusBalance: string;
      isRollOver: boolean;
      expiryDate: string;
      bonusExpiryDate: string;
    };
  };
}
interface ISidebar extends HtmlHTMLAttributes<HTMLDivElement> {
  showSidebar?: boolean;
}
export const SideBar: React.FC<ISidebar> = (props) => {
  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const { data, loading } = useFetch<AirtimeDataResp>(
    `Mobility.Account/api/Balance/AirtimeAndData`,
  );

  const isHybrid = () => data?.result.airtimeModel.subscriberType === 'HYBRID';

  const isPostpaid = () =>
    data?.result.airtimeModel.subscriberType === 'POSTPAID';

  const isPrepaid = () =>
    data?.result.airtimeModel.subscriberType === 'PREPAID';

  return (
    <Styles.SideBar {...props}>
      <Logo style={{ marginLeft: rem(20) }} />
      <SizedBox height={30} />
      <Column>
        <Card color={convertHexToRGBA(Colors.yellowGreen, 0.3)}>
          <Row wrap={false}>
            <Avatar
              style={{ marginRight: '10px' }}
              image="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
            />
            <Column>
              <Text size={14}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text color={Colors.blackGrey} size={12}>
                {user?.email}
              </Text>
            </Column>
          </Row>
        </Card>
        <SizedBox height={10} />
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/dashboard"
        >
          <HomeIcon />
          Dashboard
        </Styles.SideBarLink>
        <SizedBox height={20} />

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="any"
          onClick={(e) => e.preventDefault()}
        >
          <Text size={12} color={Colors.blackGrey} weight={600}>
            Network & Subscriber services
          </Text>
        </Styles.SideBarLink>
        <SizedBox height={5} />

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/customer"
        >
          <AirtimeIcon />
          Customer
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/data">
          <DataIcon />
          Data
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/call">
          <CallHistoryIcon />
          Call History
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/data-usage/history"
        >
          <DataUsage />
          Data Usage
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/transaction/history"
        >
          <TimeIcon />
          Transaction History
        </Styles.SideBarLink>
        {loading && (
          <Styles.SideBarLink
            activeClassName="active-sidebar-link"
            to="..."
            onClick={(e) => e.preventDefault()}
          >
            Getting your plan...
            <Spinner size={20} />
          </Styles.SideBarLink>
        )}
        {(isHybrid() || isPrepaid()) && (
          <Styles.SideBarLink
            activeClassName="active-sidebar-link"
            to="/prepaid-plans"
          >
            <PrepaidPlanIcon />
            Prepaid Plans
          </Styles.SideBarLink>
        )}
        {isHybrid() || isPostpaid() ? (
          <Styles.SideBarLink
            activeClassName="active-sidebar-link"
            to="/postpaid"
          >
            <PostPaidIcon />
            Postpaid/Corporate
          </Styles.SideBarLink>
        ) : (
          <Styles.SideBarLink
            to="any"
            onClick={(e) => e.preventDefault()}
            style={{ color: `${Colors.grey}` }}
          >
            <PostPaidIcon />
            Postpaid/Corporate
          </Styles.SideBarLink>
        )}
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/roaming">
          <RoamingIcon />
          Roaming
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/subscribed-services"
        >
          <SubscribedIcon />
          My Subscribed Services
        </Styles.SideBarLink>
      </Column>
    </Styles.SideBar>
  );
};
