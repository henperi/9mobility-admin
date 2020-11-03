import React, { HtmlHTMLAttributes, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Styles } from './style';
import { Column } from '../UiKit/Column';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../UiKit/SizedBox';

import { ReactComponent as DashboardIcon } from '../../assets/images/Menu/dashboard-icon.svg';
import { ReactComponent as UserIcon } from '../../assets/images/Menu/user-alt-solid.svg';
import { ReactComponent as AirtimeRechargeIcon } from '../../assets/images/Menu/airtime-rechage-icon.svg';
import { ReactComponent as DataPurchaseIcon } from '../../assets/images/Menu/data-purchase-icons.svg';
import { ReactComponent as WifiIcon } from '../../assets/images/Menu/wifi-icon.svg';
import { ReactComponent as AirtimeTransferIcon } from '../../assets/images/Menu/airtime-transfer-icon.svg';
import { ReactComponent as CreditCardIcon } from '../../assets/images/Menu/credit-card-icon.svg';
import { ReactComponent as IncompleteRegIcon } from '../../assets/images/Menu/incomplete-reg-icon.svg';
import { ReactComponent as GlobeIcon } from '../../assets/images/Menu/globe-icon.svg';
// import { ReactComponent as AdsIcon } from '../../assets/images/Menu/ads-icon.svg';
import { ReactComponent as UserCogIcon } from '../../assets/images/Menu/user-cog-icon.svg';
// import { ReactComponent as AuditIcon } from '../../assets/images/Menu/audit-icon.svg';
import { ReactComponent as PrepaidPackageIcon } from '../../assets/images/Menu/prepaid-package-icon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/Menu/settings-icon.svg';
import { Card } from '../UiKit/Card';
import { Avatar } from '../UiKit/Avatar';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { Row } from '../UiKit/Row';
import { Text } from '../UiKit/Text';
import { useGlobalStore } from '../../store';
import { useInterceptor } from '../../hooks/useInterceptor';
import { ArrowIcon } from '../UiKit/Pagination';
import { removeAuthUser } from '../../store/modules/auth/actions';

interface ISidebar extends HtmlHTMLAttributes<HTMLDivElement> {
  showSidebar?: boolean;
}
export const SideBar: React.FC<ISidebar> = (props) => {
  const {
    state: { auth },
    dispatch,
  } = useGlobalStore();

  useInterceptor();

  const [showDropDown, setshowDropDown] = useState(false);
  const history = useHistory();

  return (
    <Styles.SideBar {...props}>
      <Column
        style={{
          background: `linear-gradient(75.7deg, ${Colors.darkGreen} -50%, ${Colors.yellowGreen} 284.37%)`,
          padding: '1rem',
        }}
      >
        <Card fullWidth color={convertHexToRGBA(Colors.darkGreen)}>
          <Row wrap={false} alignItems="flex-start">
            <Avatar
              style={{ marginRight: '10px' }}
              image={
                auth.user?.photoUrl === 'string' ? '' : auth.user?.photoUrl
              }
            />
            <Column xs={10}>
              <Text size={14} color={Colors.white} weight="400">
                {auth.user?.name}
              </Text>
              <Text
                color={convertHexToRGBA(Colors.white, 0.6)}
                size={12}
                variant="lighter"
              >
                {auth.user?.roleName || 'Admin'}
              </Text>
              {showDropDown && (
                <>
                  <SizedBox height={10} />
                  <Text
                    size={14}
                    weight="400"
                    color={convertHexToRGBA(Colors.white, 0.8)}
                    onClick={() => history.push('/settings')}
                  >
                    Profile Settings
                  </Text>
                  <SizedBox height={5} />
                  <Text
                    size={14}
                    color={convertHexToRGBA(Colors.white, 0.8)}
                    weight="400"
                    onClick={() => dispatch(removeAuthUser())}
                  >
                    Log Out
                  </Text>
                </>
              )}
            </Column>
            <ArrowIcon
              color={Colors.white}
              angle={0}
              onClick={() => setshowDropDown((prev) => !prev)}
            />
          </Row>
        </Card>
      </Column>
      <Column>
        <SizedBox height={20} />
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/dashboard"
        >
          <DashboardIcon />
          Dashboard
        </Styles.SideBarLink>

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/customer"
        >
          <UserIcon />
          Customers
        </Styles.SideBarLink>

        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/airtime-recharge"
        >
          <AirtimeRechargeIcon />
          Airtime Recharge
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/data-purchase"
        >
          <DataPurchaseIcon />
          Data Purchase
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/airtime-transfer"
        >
          <AirtimeTransferIcon />
          Airtime transfer
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/data-transfer"
        >
          <WifiIcon />
          Data Transfer
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/payment-history"
        >
          <CreditCardIcon />
          Payment History
        </Styles.SideBarLink>
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/incomplete-registration"
        >
          <IncompleteRegIcon />
          Incomplete registration
        </Styles.SideBarLink>
        <Styles.SideBarLink activeClassName="active-sidebar-link" to="/roaming">
          <GlobeIcon />
          Roaming
        </Styles.SideBarLink>
        {/* <Styles.SideBarLink activeClassName="active-sidebar-link" to="/ads">
          <AdsIcon />
          Ads
        </Styles.SideBarLink> */}
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/prepaid-package"
        >
          <PrepaidPackageIcon />
          Prepaid package
        </Styles.SideBarLink>
        {/* <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/postpaid-package"
        >
          <SubscribedIcon />
          Postpaid package
        </Styles.SideBarLink> */}
        {auth?.user?.roleName === 'SuperAdmin' && (
          <Styles.SideBarLink
            activeClassName="active-sidebar-link"
            to="/user-administration"
          >
            <UserCogIcon />
            User administration
          </Styles.SideBarLink>
        )}
        {/* <Styles.SideBarLink activeClassName="active-sidebar-link" to="/audit">
          <AuditIcon />
          Audit
        </Styles.SideBarLink> */}
        <Styles.SideBarLink
          activeClassName="active-sidebar-link"
          to="/settings"
        >
          <SettingsIcon />
          Settings
        </Styles.SideBarLink>
      </Column>
    </Styles.SideBar>
  );
};
