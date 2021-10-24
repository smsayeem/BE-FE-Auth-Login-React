import React from 'react';
import { Redirect, Route } from 'react-router';
import { getToken } from '../utils/common';

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Redirect to={{ pathname: '/dashboard' }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
