import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const PORT = process.env.PORT || '3000';

app.use(cors());

const typeDefs = gql`
  type Query {
    feed: String!
  }
`;

const resolvers = {
  Query: {
    feed: () => 'Welcome to Feed Page',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
