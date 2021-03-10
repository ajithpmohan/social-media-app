import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from 'components/feature/App';
import { AuthProvider } from 'contextAPI';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GATEWAY_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: authUser?.token ? `Bearer ${authUser.token}` : '',
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      fields: {
        likes: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Comment: {
      fields: {
        likes: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  name: 'gateway',
  version: '1.0',
});

export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
