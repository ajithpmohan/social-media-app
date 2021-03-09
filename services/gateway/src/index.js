import 'dotenv/config';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import expressJwt from 'express-jwt';

const port = process.env.PORT || '5000';
const app = express();

app.use(
  expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
  }),
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
          context.user ? JSON.stringify(context.user) : null,
        );
      },
    });
  },
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Gateway ready at http://localhost:${port}${server.graphqlPath}`),
);
