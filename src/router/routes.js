import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Auth from "../containers/AdministratorSide/Auth/Auth";

import PrivateRoute from './PrivateRoute';
import Loader from './components/Loader';
import { privateRoutes, publicRoutes } from './routingMap';

const AdministratorSide = lazy(() => import('../containers/AdministratorSide/AdministratorSide'));
const UserSide = lazy(() => import('../containers/UserSide/UserSide'));

const Routes = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          {/*USER SIDE*/}
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              render={props =>
                <UserSide>
                  {route.path.includes('auth') ?
                    <Auth>
                      <route.component {...props} />
                    </Auth>
                    : <route.component {...props} />
                  }
                </UserSide>
              }
            />
          ))}
          {/*ADMIN SIDE*/}
          <PrivateRoute>
            <AdministratorSide>
              <Suspense fallback={<Loader />}>
                <Switch>
                  {privateRoutes.map((route, index) => (
                    <Route
                      key={index}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  ))}
                  <Route component={props => <Redirect to="/auth/login" />} />
                </Switch>
              </Suspense>
            </AdministratorSide>
          </PrivateRoute>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
