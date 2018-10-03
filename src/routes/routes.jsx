import React from 'react';

import LoadingPage from '../pages/Loading';

import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import { isAuthenticated } from '../utils/utils';

import RoutesContainer from '../components/RoutesContainer';

const AsyncHome = Loadable({
  loader: () => import('../pages/Home'),
  loading: LoadingPage,
  delay: 300
})

const AsyncSignIn = Loadable({
  loader: () => import('../pages/SignIn'),
  loading: LoadingPage,
  delay: 300
});

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route { ...rest } render={props => (
//     isAuthenticated() ? (
//       <Component { ...props } />
//     ) : (
//       <Redirect to={{ pathname: '/signIn', state: { from: props.location } }} />
//     )
//   )} />
// )

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={props => (
    isAuthenticated() ? (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ) : (
      <Component { ...props } />
    )
  )} />
)

const routes = () => (
  <Switch>
    <RoutesContainer>
      <Route path='/' component={ AsyncHome } exact />
      <AuthRoute path='/signIn' component={ AsyncSignIn } exact />
    </RoutesContainer>
  </Switch>
)

export default routes;
