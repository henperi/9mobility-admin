import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { DashboardPage } from '../pages/Dashboard';
import { LoginPage } from '../pages/Login';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />

      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
    </Switch>
  );
};
