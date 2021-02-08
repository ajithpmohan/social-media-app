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

const Register = () => {
  const { login } = useContext(AuthCtx);
  const history = useHistory();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const disabled =
    user.username === '' ||
    user.email === '' ||
    user.password === '' ||
    user.confirmPassword === '';

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    variables: user,
    onCompleted({ register: payload }) {
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
    addUser();
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Header as="h2" textAlign="center">
          Register
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
              icon="user"
              name="username"
              iconPosition="left"
              placeholder="Username"
              value={user.username}
              error={errors?.username ? true : false}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Form.Input
              fluid
              name="email"
              type="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={user.email}
              error={errors?.email ? true : false}
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
            <Form.Input
              fluid
              name="confirmPassword"
              type="password"
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <Button color="blue" fluid size="large" disabled={disabled}>
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
          Already signed up?&nbsp;<Link to={ROUTES.LOGIN}>Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

export default Register;
