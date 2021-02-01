import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

const PORT = process.env.PORT || '3000';

const corsOptions = {
  origin: process.env.WEB_URL,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
