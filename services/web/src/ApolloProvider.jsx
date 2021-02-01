import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import App from 'components/App';

const account = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `${process.env.REACT_APP_ACCOUNT_API}graphql`,
  }),
  name: 'account',
  version: '1.0',
});

const feed = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `${process.env.REACT_APP_FEED_API}graphql`,
  }),
  name: 'feed ',
  version: '1.0',
});

const client = { account, feed };

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// export default (
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>
// );
