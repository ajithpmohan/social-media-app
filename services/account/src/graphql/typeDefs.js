import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
    updatedAt: String!
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

  type Profile {
    id: ID!
    fullName: String!
    firstName: String!
    lastName: String!
    avatar: String!
    dob: String!
    user: String!
    createdAt: String!
    updatedAt: String!
  }

  input ProfileInput {
    firstName: String!
    lastName: String!
    avatar: String
    dob: String
  }

  type Query {
    login(loginInput: LoginInput): User!
    getProfile: Profile!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    createUpdateProfile(profileInput: ProfileInput): Profile!
  }
`;

export default typeDefs;
