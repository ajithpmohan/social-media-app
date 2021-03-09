import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const port = process.env.PORT || '5001';

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req }) => ({ req }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Account Service ready at ${url}`);
});
