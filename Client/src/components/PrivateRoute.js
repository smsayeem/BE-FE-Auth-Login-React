import React from 'react';
import { Redirect, Route } from 'react-router';
import { getToken } from '../utils/common';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>{
        console.log('props=', props);
        return getToken() ? <Component {...props} /> : <Redirect to={{pathname: "/login", state: props.location}} />}
      }
    />
  );
};