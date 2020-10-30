import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Styles } from './style';
import { Column } from '../../../components/UiKit/Column';
import { Row } from '../../../components/UiKit/Row';

export const TableNav = () => {
  const match = useRouteMatch();
  return (
    <Column style={{ borderBottom: '1px solid #ECECF2' }}>
      <Row>
        <Styles.TableNavLink
          activeClassName="active-table-nav-link"
          to={`${match.url}/payment-history`}
        >
          Payment History
        </Styles.TableNavLink>
        <Styles.TableNavLink
          activeClassName="active-table-nav-link"
          to={`${match.url}/airtime-recharge`}
        >
          Airtime Recharge
        </Styles.TableNavLink>
        <Styles.TableNavLink
          activeClassName="active-table-nav-link"
          to={`${match.url}/data-transfer`}
        >
          Data Transfer
        </Styles.TableNavLink>
        <Styles.TableNavLink
          activeClassName="active-table-nav-link"
          to={`${match.url}/airtime-data-transfer`}
        >
          Airtime/data transfer
        </Styles.TableNavLink>
        <Styles.TableNavLink
          activeClassName="active-table-nav-link"
          to={`${match.url}/data-usage`}
        >
          Data Usage
        </Styles.TableNavLink>
      </Row>
    </Column>
  );
};
