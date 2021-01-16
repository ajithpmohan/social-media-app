import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || '3000';

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});