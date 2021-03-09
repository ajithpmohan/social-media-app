import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { permissions } from './utils/permissions';

const port = process.env.PORT || '5002';

const server = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions,
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`Feed Service ready at ${url}`);
});
