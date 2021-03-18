const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const expressJwt = require('express-jwt');
require('dotenv/config');

const port = process.env.PORT || '5000';

const app = express();

app.use(
  expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
  })
);

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'account', url: process.env.ACCOUNT_URL },
    { name: 'feed', url: process.env.FEED_URL },
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          'user',
          context.user ? JSON.stringify(context.user) : null
        );
      },
    });
  },
});

(async () => {
  const server = new ApolloServer({
    // Pass the ApolloGateway to the ApolloServer constructor
    gateway,

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
  });

  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(
      `Gateway ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
})();
