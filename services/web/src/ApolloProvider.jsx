import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import App from 'components/App';
import { AuthCtxProvider } from 'contextAPI';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: process.env.REACT_APP_GATEWAY_API,
  }),
  name: 'server',
  version: '1.0',
});

export default (
  <ApolloProvider client={client}>
    <AuthCtxProvider>
      <App />
    </AuthCtxProvider>
  </ApolloProvider>
);
