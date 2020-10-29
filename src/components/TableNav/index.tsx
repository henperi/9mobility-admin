import React, { HtmlHTMLAttributes } from 'react';
import { Styles } from './style';
import { Column } from '../UiKit/Column';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../UiKit/SizedBox';
import { Row } from '../UiKit/Row';
import { Text } from '../UiKit/Text';

export const TableNav = () => {
  return (
      <Column style={{ borderBottom: '1px solid #ECECF2' }}>
        <Row>
        <Styles.TableNavLink
            activeClassName="active-table-nav-link"
            to="/customer/:id/payment-history"
          >
            Payment History
          </Styles.TableNavLink>
          <Styles.TableNavLink
            activeClassName="active-table-nav-link"
            to="/customer/:id/airtime-recharge"
          >
            Airtime Recharge
          </Styles.TableNavLink>
          <Styles.TableNavLink
            activeClassName="active-table-nav-link"
            to="/customer/:id/data-transfer"
          >
            Data Transfer
          </Styles.TableNavLink>
          <Styles.TableNavLink
            activeClassName="active-table-nav-link"
            to="/customer/:id/airtime-data-transfer"
          >
            Airtime/data transfer
          </Styles.TableNavLink>
          <Styles.TableNavLink
            activeClassName="active-table-nav-link"
            to="/customer/:id/data-usage"
          >
            Data Usage
          </Styles.TableNavLink>
        </Row>
      </Column>
  );
};
