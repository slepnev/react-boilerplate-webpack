import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainModule from '../modules/main';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" key="main" component={MainModule} />
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>
);

export default Routes;
