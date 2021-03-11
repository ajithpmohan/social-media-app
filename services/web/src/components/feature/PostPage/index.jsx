import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Comment } from 'semantic-ui-react';

import { CommentCard, PrimaryCard } from 'components/shared/Cards';
import { GET_POST } from 'schemas';

const PostPage = () => {
  const { id: postId } = useParams();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { post } = data;

  return (
    <>
      <PrimaryCard key={post.id} feed={post} />

      <Comment.Group size="small">
        {post.comments.map((comment) => (
          <CommentCard comment={comment} postId={post.id} key={comment.id} />
        ))}
      </Comment.Group>
    </>
  );
};

export default PostPage;
