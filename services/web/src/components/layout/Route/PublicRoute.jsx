import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const PublicRoute = ({ component: Component, ...rest }) => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  return (
    // Show the component only when the user is not logged in
    // Otherwise, redirect the user to login page
    <Route
      {...rest}
      render={(props) =>
        authUser ? <Redirect to={ROUTES.LOGIN} /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;
