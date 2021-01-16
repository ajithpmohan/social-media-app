import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
    isActive: Boolean!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    login(loginInput: LoginInput): User!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

export default typeDefs;
