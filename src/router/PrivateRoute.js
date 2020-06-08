import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const userRole = useSelector(state => state.user.role);

  if (localStorage.getItem('token')) {
    if (userRole) return children;
    return <div>loading</div>
  }

  return (
    <Redirect
      to={{
        pathname: '/auth/login',
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;