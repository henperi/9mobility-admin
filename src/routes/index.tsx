import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Ads } from '../pages/Ads';
import { AirtimeRechargePage } from '../pages/Airtime/AirtimeRecharge';
import { AirtimeTransfer } from '../pages/Airtime/AirtimeTransfer';
import { Audit } from '../pages/Audit';
import { CustomerPage } from '../pages/Customer';
import { CustomerDetails } from '../pages/Customer/CustomerDetails';
import { CustomerPaymentHistory } from '../pages/Customer/Sections/CustomerPaymentHistory';
import { CustomerAirtimeRecharge } from '../pages/Customer/Sections/CustomerAirtimeRecharge';
import { CustomerDataTransfer } from '../pages/Customer/Sections/CustomerDataTransfer';
import { CustomerDataUsage } from '../pages/Customer/Sections/CustomerDataUsage';
import { CustomerAirtimeTransfer } from '../pages/Customer/Sections/CustomerAirtimeTransfer';
import { DashboardPage } from '../pages/Dashboard';
import { DataPurchase } from '../pages/Data/DataPurchase';
import { DataTransfer } from '../pages/Data/DataTransfer';
import { IncompleteRegistration } from '../pages/IncompleteRegistration';
import { LoginPage } from '../pages/Login';
import { PaymentHistory } from '../pages/PaymentHistory';
import { PrepaidPackage } from '../pages/PrepaidPackage';
import { Roaming } from '../pages/Roaming';
import { Settings } from '../pages/Settings';
import { UserAdministration } from '../pages/UserAdministration';
import { UserDetails } from '../pages/UserAdministration/UserDetails';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />

      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
      <ProtectedRoute exact path="/customer" component={CustomerPage} />
      <ProtectedRoute path="/customer/:id">
        <CustomerDetails>
          <Switch>
            <Redirect
              exact
              from="/customer/:id"
              to="/customer/:id/payment-history"
            />
            <ProtectedRoute
              exact
              path="/customer/:id/payment-history"
              component={CustomerPaymentHistory}
            />
            <ProtectedRoute
              exact
              path="/customer/:id/airtime-recharge"
              component={CustomerAirtimeRecharge}
            />
            <ProtectedRoute
              exact
              path="/customer/:id/data-transfer"
              component={CustomerDataTransfer}
            />
            <ProtectedRoute
              exact
              path="/customer/:id/airtime-data-transfer"
              component={CustomerAirtimeTransfer}
            />
            <ProtectedRoute
              exact
              path="/customer/:id/data-usage"
              component={CustomerDataUsage}
            />
          </Switch>
        </CustomerDetails>
      </ProtectedRoute>

      <ProtectedRoute exact path="/user/:id" component={UserDetails} />
      <ProtectedRoute
        exact
        path="/airtime-recharge"
        component={AirtimeRechargePage}
      />
      <ProtectedRoute
        exact
        path="/airtime-transfer"
        component={AirtimeTransfer}
      />
      <ProtectedRoute exact path="/data-purchase" component={DataPurchase} />
      <ProtectedRoute exact path="/data-transfer" component={DataTransfer} />
      <ProtectedRoute
        exact
        path="/payment-history"
        component={PaymentHistory}
      />
      <ProtectedRoute
        exact
        path="/incomplete-registration"
        component={IncompleteRegistration}
      />
      <ProtectedRoute exact path="/roaming" component={Roaming} />
      <ProtectedRoute exact path="/ads" component={Ads} />
      <ProtectedRoute
        exact
        path="/prepaid-package"
        component={PrepaidPackage}
      />
      <ProtectedRoute
        exact
        path="/user-administration"
        component={UserAdministration}
      />
      <ProtectedRoute exact path="/audit" component={Audit} />
      <ProtectedRoute exact path="/settings" component={Settings} />
    </Switch>
  );
};
