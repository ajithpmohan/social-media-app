import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Feed } from 'semantic-ui-react';

import { PostCard } from 'components/shared/Cards';

const GET_POSTS = gql`
  query posts {
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

const Timeline = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Feed size="large">
      {data.getPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Feed>
  );
};

export default Timeline;
