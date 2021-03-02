import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Login from 'components/feature/Login';
import Register from 'components/feature/Register';
import HomePage from 'components/feature/HomePage';
import PostPage from 'components/feature/PostPage';
import CommentPage from 'components/feature/CommentPage';
import MenuBar from 'components/layout/MenuBar';

import * as ROUTES from 'constants/routes';
import { PublicRoute, PrivateRoute } from 'components/layout/Route';

import './styles.css';

const App = () => {
  return (
    <Container fluid>
      <Router>
        <MenuBar />
        <Container id="main">
          <Switch>
            <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
            <PublicRoute exact path={ROUTES.REGISTER} component={Register} />
            <PrivateRoute exact path={ROUTES.HOME} component={HomePage} />
            <PrivateRoute exact path={ROUTES.POST} component={PostPage} />
            <PrivateRoute exact path={ROUTES.COMMENT} component={CommentPage} />
          </Switch>
        </Container>
      </Router>
    </Container>
  );
};

export default App;
