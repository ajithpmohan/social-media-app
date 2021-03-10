import { gql } from '@apollo/client';
import { Fragment } from 'schemas';

export const GET_POSTS = gql`
  query GetPosts {
    posts: getPosts {
      ...Post
    }
  }
  ${Fragment.feed.post}
`;

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    post: getPost(postId: $postId) {
      ...Post
      ...Comments
    }
  }
  ${Fragment.feed.post}
  ${Fragment.feed.comments}
`;

export const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    post: createPost(body: $body) {
      ...Post
    }
  }
  ${Fragment.feed.post}
`;

export const LIKE_POST = gql`
  mutation LikePost($feedId: ID!) {
    post: likePost(feedId: $feedId) {
      ...Post
    }
  }
  ${Fragment.feed.post}
`;

export const GET_COMMENT = gql`
  query GetComment($commentId: ID!) {
    comment: getComment(commentId: $commentId) {
      ...Comment
      post {
        ...Post
      }
      ancestors {
        ...Comment
      }
      ...Replies
    }
  }
  ${Fragment.feed.post}
  ${Fragment.feed.comment}
  ${Fragment.feed.replies}
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $commentId: ID, $body: String!) {
    comment: createComment(
      postId: $postId
      commentId: $commentId
      body: $body
    ) {
      ...Comment
      post {
        ...Post
      }
      ancestors {
        ...Comment
      }
    }
  }
  ${Fragment.feed.post}
  ${Fragment.feed.comment}
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($feedId: ID!) {
    comment: likeComment(feedId: $feedId) {
      ...Comment
      post {
        ...Post
      }
    }
  }
  ${Fragment.feed.post}
  ${Fragment.feed.comment}
`;
