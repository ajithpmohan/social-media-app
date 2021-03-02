import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Profile @key(fields: "id") {
    id: ID! @external
  }

  type Post {
    id: ID!
    body: String!
    author: Profile!
    createdAt: String!
    likeCount: Int!
    likes: [Like]
    commentCount: Int!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    body: String!
    author: Profile!
    createdAt: String!
    post: Post!
    ancestors: [Comment]
    likeCount: Int!
    likes: [Like]
    replies: [Comment]
    repliesCount: Int!
  }

  type Like {
    id: ID!
    author: ID!
    createdAt: String!
  }

  extend type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
    getComment(commentId: ID): Comment!
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(feedId: ID!): Post!
    createComment(postId: ID!, commentId: ID, body: String!): Comment!
    deleteComment(postId: ID!, commentId: ID!): String!
    likeComment(feedId: ID): Comment!
  }
`;

export default typeDefs;
