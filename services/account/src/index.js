import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const typeDefs = gql`
  type Query {
    home: String!
  }
`;

const resolvers = {
  Query: {
    home: () => 'Welcome to Home Page',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || '3000';

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
