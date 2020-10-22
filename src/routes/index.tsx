import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Ads } from '../pages/Ads';
import { AirtimeRechargePage } from '../pages/Airtime/AirtimeRecharge';
import { AirtimeTransfer } from '../pages/Airtime/AirtimeTransfer';
import { Audit } from '../pages/Audit';
import { CustomerPage } from '../pages/Customer';
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

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />

      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/customer" component={CustomerPage} />
      <Route exact path="/airtime-recharge" component={AirtimeRechargePage} />
      <Route exact path="/airtime-transfer" component={AirtimeTransfer} />
      <Route exact path="/data-purchase" component={DataPurchase} />
      <Route exact path="/data-transfer" component={DataTransfer} />
      <Route exact path="/payment-history" component={PaymentHistory} />
      <Route
        exact
        path="/incomplete-registration"
        component={IncompleteRegistration}
      />
      <Route exact path="/roaming" component={Roaming} />
      <Route exact path="/ads" component={Ads} />
      <Route exact path="/prepaid-package" component={PrepaidPackage} />
      <Route exact path="/user-administration" component={UserAdministration} />
      <Route exact path="/audit" component={Audit} />
      <Route exact path="/settings" component={Settings} />
    </Switch>
  );
};
