import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from 'contextAPI';
import { sessionReducer } from 'reducers';

const AuthProvider = ({ children }) => {
  const initialState = {
    authUser: JSON.parse(
      localStorage.getItem('authUser') || '{"isAuth":false}',
    ),
  };

  const [authState, authDispatch] = useReducer(sessionReducer, initialState);

  const login = (payload) => {
    localStorage.setItem(
      'authUser',
      JSON.stringify({ ...payload, isAuth: true }),
    );
    authDispatch({ type: 'SET_AUTHUSER', payload });
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    authDispatch({ type: 'REMOVE_AUTHUSER' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
