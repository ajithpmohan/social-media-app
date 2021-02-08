import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type User @key(fields: "id") {
    id: ID! @external
  }

  type Post {
    id: ID!
    body: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: ID!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

export default typeDefs;
