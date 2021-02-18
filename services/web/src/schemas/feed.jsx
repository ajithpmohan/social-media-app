import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      author {
        id
        username
        name
        avatar
      }
      createdAt
      commentCount
      likeCount
      likes {
        id
        author
        createdAt
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      author {
        id
        name
        username
        avatar
      }
      createdAt
      post {
        id
        body
        author {
          id
          name
          username
          avatar
        }
        createdAt
        commentCount
        likeCount
        likes {
          id
          author
          createdAt
        }
      }
      ancestors {
        id
        body
        author {
          id
          name
          username
          avatar
        }
        createdAt
        replyCount
      }
      replyCount
      replies {
        id
        body
        author {
          id
          name
          username
          avatar
        }
        createdAt
        replyCount
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      author {
        id
        name
        avatar
        username
      }
      commentCount
      likeCount
      likes {
        id
        author
        createdAt
      }
    }
  }
`;
