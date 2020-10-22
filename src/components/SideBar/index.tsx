import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';
import { Column } from '../UiKit/Column';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../UiKit/SizedBox';

import { ReactComponent as HomeIcon } from '../../assets/images/homeIcon.svg';
import { ReactComponent as CallHistoryIcon } from '../../assets/images/callHistoryIcon.svg';
import { ReactComponent as DataIcon } from '../../assets/images/dataIcon.svg';
import { ReactComponent as DataUsage } from '../../assets/images/dataUsageIcon.svg';
import { ReactComponent as TimeIcon } from '../../assets/images/timeIcon.svg';
import { ReactComponent as PrepaidPlanIcon } from '../../assets/images/prepaidPlanIcon.svg';
import { ReactComponent as SubscribedIcon } from '../../assets/images/subscribedIcon.svg';
import { Card } from '../UiKit/Card';
import { Avatar } from '../UiKit/Avatar';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { Row } from '../UiKit/Row';
import { Text } from '../UiKit/Text';

interface ISidebar extends HtmlHTMLAttributes<HTMLDivElement> {
  showSidebar?: boolean;
}
export const SideBar: React.FC<ISidebar> = (props) => {
  return (
    <Styles.SideBar {...props}>
      <Column
        style={{
          background: `linear-gradient(75.7deg, ${Colors.darkGreen} -50%, ${Colors.yellowGreen} 284.37%)`,
          padding: '1rem',
        }}
      >
        <Card color={convertHexToRGBA(Colors.darkGreen)}>
          <Row wrap={false}>
            <Avatar
              style={{ marginRight: '10px' }}
              image="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
            />
            <Column>
              <Text size={14} color={Colors.white} weight="400">
                Firstname Lastname
              </Text>
              <Text color={Colors.white} size={12}>
                Admin
              </Text>
            </Column>
          </Row>
        </Card>
      </Column>
      <Column>
        <SizedBox height={20} />
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/dashboard"
        >
          <HomeIcon />
          Dashboard
        </Styles.SideBarLink>

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/customer"
        >
          <HomeIcon />
          Customer
        </Styles.SideBarLink>

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/airtime-recharge"
        >
          <DataIcon />
          Airtime Recharge
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/data-purchase"
        >
          <DataIcon />
          Data Purchase
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/airtime-transfer"
        >
          <CallHistoryIcon />
          Airtime transfer
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/data-transfer"
        >
          <DataUsage />
          Data Transfer
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/payment-history"
        >
          <TimeIcon />
          Payment History
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/incomplete-registration"
        >
          <TimeIcon />
          Incomplete registration
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/roaming">
          <PrepaidPlanIcon />
          Roaming
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/ads">
          <SubscribedIcon />
          Ads
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/prepaid-package"
        >
          <SubscribedIcon />
          Prepaid package
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/postpaid-package"
        >
          <SubscribedIcon />
          Postpaid package
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/user-administration"
        >
          <SubscribedIcon />
          User administration
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/audit">
          <SubscribedIcon />
          Audit
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/settings"
        >
          <SubscribedIcon />
          Settings
        </Styles.SideBarLink>
      </Column>
    </Styles.SideBar>
  );
};
