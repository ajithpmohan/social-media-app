import { gql } from '@apollo/client';

export const Fragment = {
  feed: {
    post: gql`
      fragment Post on Post {
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
    `,
    comments: gql`
      fragment Comments on Post {
        comments {
          id
          body
          author {
            id
            name
            avatar
            username
          }
          createdAt
          commentCount: repliesCount
          likeCount
          likes {
            id
            author
            createdAt
          }
        }
      }
    `,
    comment: gql`
      fragment Comment on Comment {
        id
        body
        author {
          id
          name
          avatar
          username
        }
        createdAt
        commentCount: repliesCount
        likeCount
        likes {
          id
          author
          createdAt
        }
      }
    `,
    replies: gql`
      fragment Replies on Comment {
        replies {
          id
          body
          author {
            id
            name
            avatar
            username
          }
          createdAt
          commentCount: repliesCount
          likeCount
          likes {
            id
            author
            createdAt
          }
        }
      }
    `,
  },
};
