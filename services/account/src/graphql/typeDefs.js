import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
    avatar: String!
    dob: String!
    isActive: String!
    createdAt: String!
    updatedAt: String!
    token: String!
  }

  type Profile @key(fields: "id") {
    id: ID!
    name: String!
    username: String!
    avatar: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  extend type Query {
    me: Profile!
  }

  type Mutation {
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
  }
`;

export default typeDefs;
