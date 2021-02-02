import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MenuBar from 'components/MenuBar';
import Home from 'domain/Home';
import Login from 'domain/Login';
import Register from 'domain/Register';
import Timeline from 'domain/Timeline';

import * as ROUTES from 'constants/routes';
import { Container } from 'semantic-ui-react';
import { PublicRoute, PrivateRoute } from 'components/Route';

const App = () => {
  return (
    <Container>
      <Router>
        <MenuBar />

        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
          <PublicRoute exact path={ROUTES.REGISTER} component={Register} />
          <PrivateRoute exact path={ROUTES.TIMELINE} component={Timeline} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
