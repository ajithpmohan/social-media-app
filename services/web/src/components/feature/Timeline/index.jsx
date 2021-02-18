import React from 'react';
import { useQuery } from '@apollo/client';
import { Feed } from 'semantic-ui-react';

import { PostCard } from 'components/shared/Cards';
import { GET_POSTS } from 'schemas';

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
