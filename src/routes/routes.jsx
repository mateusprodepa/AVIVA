import React from 'react';
import Home from '../pages/Home';
import { Route, Redirect, Switch } from 'react-router-dom';

const routes = () => (
  <Switch>
    <Route path='/' component={ Home }></Route>
  </Switch>
)

export default routes;
