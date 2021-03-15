/* eslint-disable */
import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './styles.css';

import * as ROUTES from 'constants/routes';
import { PrivateRoute, PublicRoute } from 'components/layout/Route';

import CommentPage from 'components/feature/CommentPage';
import HomePage from 'components/feature/HomePage';
import LoginPage from 'components/feature/LoginPage';
import NotFoundPage from 'components/feature/NotFoundPage';
import PostPage from 'components/feature/PostPage';
import RegisterPage from 'components/feature/RegisterPage';
import MenuBar from 'components/layout/MenuBar';

const App = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <MenuBar />
        <Container>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to={ROUTES.HOME} />}
            />
            <PublicRoute exact path={ROUTES.LOGIN} component={LoginPage} />
            <PublicRoute
              exact
              path={ROUTES.REGISTER}
              component={RegisterPage}
            />
            <PrivateRoute exact path={ROUTES.HOME} component={HomePage} />
            <PrivateRoute exact path={ROUTES.POST} component={PostPage} />
            <PrivateRoute exact path={ROUTES.COMMENT} component={CommentPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </BrowserRouter>
    </Container>
  );
};

export default App;
