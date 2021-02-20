import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Login from 'components/feature/Login';
import Register from 'components/feature/Register';
import Timeline from 'components/feature/Timeline';
import MenuBar from 'components/layout/MenuBar';
import Post from 'components/feature/Post';

import * as ROUTES from 'constants/routes';
import { PublicRoute, PrivateRoute } from 'components/layout/Route';

import './styles.css';

const App = () => {
  return (
    <Container>
      <Router>
        <MenuBar />

        <Switch>
          <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
          <PublicRoute exact path={ROUTES.REGISTER} component={Register} />
          <PrivateRoute exact path={ROUTES.TIMELINE} component={Timeline} />
          <PrivateRoute exact path={ROUTES.POST} component={Post} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
