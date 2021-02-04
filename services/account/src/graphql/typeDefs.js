import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
    isActive: Boolean!
  }

  input RegisterInput {
    email: String!
    username: String!
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
    avatar: String!
    dob: String!
    user: User!
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
    getAuthUser: User!
    getProfile: Profile!
  }

  type Mutation {
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
    createUpdateProfile(profileInput: ProfileInput): Profile!
  }
`;

export default typeDefs;
