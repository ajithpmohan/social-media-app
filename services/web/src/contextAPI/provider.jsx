import React from 'react';
import PropTypes from 'prop-types';

import { AuthCtx } from 'contextAPI';
import { sessionReducer } from 'reducers';
import * as ROUTES from 'constants/routes';

export const AuthCtxProvider = ({ children }) => {
  const initialData = {
    authUser: JSON.parse(
      localStorage.getItem('authUser') || '{"isAuth":false}',
    ),
  };

  const [authState, authDispatch] = React.useReducer(
    sessionReducer,
    initialData,
  );

  const login = (payload) => {
    localStorage.setItem(
      'authUser',
      JSON.stringify({ ...payload, isAuth: true }),
    );
    authDispatch({ type: 'SET_AUTHUSER', payload });
  };

  const logout = (history) => {
    localStorage.removeItem('authUser');
    authDispatch({ type: 'REMOVE_AUTHUSER' });
    history.push(ROUTES.LOGIN);
  };

  return (
    <AuthCtx.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

AuthCtxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
