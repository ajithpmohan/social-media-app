import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

import { AuthCtx } from 'contextAPI';
import * as ROUTES from 'constants/routes';

const Login = () => {
  const { login } = useContext(AuthCtx);
  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const disabled = user.email === '' || user.password === '';

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: user,
    onCompleted({ login: payload }) {
      login(payload);
      history.push(ROUTES.TIMELINE);
    },
    onError(err) {
      if (err.graphQLErrors.length) {
        setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    loginUser();
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Header as="h2" textAlign="center">
          Login
        </Header>
        <Segment>
          <Form
            size="large"
            onSubmit={handleSubmit}
            className={loading ? 'loading' : ''}
            noValidate
          >
            <Form.Input
              fluid
              name="email"
              type="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={user.email}
              error={errors?.username ? true : false}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Form.Input
              fluid
              name="password"
              type="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={user.password}
              error={errors?.password ? true : false}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button
              color="blue"
              fluid
              size="large"
              type="submit"
              disabled={disabled}
            >
              Login
            </Button>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </Segment>
        <Message attached="bottom" size="big" warning>
          <Icon name="help" />
          Not registered yet?&nbsp;<Link to={ROUTES.REGISTER}>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      id
      email
      username
      token
    }
  }
`;

export default Login;
