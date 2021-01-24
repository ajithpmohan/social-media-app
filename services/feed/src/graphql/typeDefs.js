import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Post {
    id: ID!
    body: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]!
    likes: [Like]!
    # commentCount: Number!
    # likeCount: Number!
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

  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    # likePost(postId: ID!): Post!
  }
`;

export default typeDefs;
