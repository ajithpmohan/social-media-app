import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Feed, Comment } from 'semantic-ui-react';

import { PostCard, CommentCard } from 'components/shared/Cards';
import { GET_POST } from 'schemas';

const Post = () => {
  const { id: postId } = useParams();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { post } = data;
  return (
    <>
      <Feed size="large">
        <PostCard post={post} key={post.id} />
      </Feed>
      <Comment.Group size="large">
        {post.comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </Comment.Group>
    </>
  );
};

export default Post;
