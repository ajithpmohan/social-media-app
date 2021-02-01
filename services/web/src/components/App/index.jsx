import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from 'domain/Home';
import Login from 'domain/Login';
import Register from 'domain/Register';
import MenuBar from 'components/MenuBar';

import * as ROUTES from 'constants/routes';
import { Container } from 'semantic-ui-react';

const App = () => {
  return (
    <Container>
      <Router>
        <MenuBar />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.REGISTER} component={Register} />
      </Router>
    </Container>
  );
};

export default App;
