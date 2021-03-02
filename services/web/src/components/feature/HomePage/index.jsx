import React from 'react';
import { useQuery } from '@apollo/client';
import { Divider, Feed, Header } from 'semantic-ui-react';

import { PostCard } from 'components/shared/Cards';
import { PostForm } from 'components/shared/Forms';
import { GET_POSTS } from 'schemas';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const isPosts = data?.posts.length > 0;
  return (
    <>
      <PostForm />
      {isPosts && (
        <>
          <Header as="h3">Recent Posts</Header>
          <Divider />
          <Feed size="large">
            {data.posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </Feed>
        </>
      )}
    </>
  );
};

export default HomePage;
