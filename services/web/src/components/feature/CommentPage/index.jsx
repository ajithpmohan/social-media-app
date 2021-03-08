import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Feed, Comment } from 'semantic-ui-react';

import { PostCard, CommentCard } from 'components/shared/Cards';
import { GET_COMMENT } from 'schemas';

const CommentPage = () => {
  const { id: commentId } = useParams();
  const { data, loading, error } = useQuery(GET_COMMENT, {
    variables: { commentId },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const { ancestors, post, replies, ...comment } = data?.comment;

  return (
    <>
      <Feed size="small">
        <PostCard post={post} key={post.id} />
      </Feed>
      <Comment.Group size="small" threaded>
        {ancestors.map((ancestor) => (
          <CommentCard
            comment={ancestor}
            postId={post.id}
            key={ancestor.id}
            threaded={true}
          />
        ))}
      </Comment.Group>
      <Comment.Group size="huge">
        <CommentCard comment={comment} postId={post.id} key={comment.id} />
      </Comment.Group>
      <Comment.Group size="small">
        {replies.map((reply) => (
          <CommentCard comment={reply} postId={post.id} key={reply.id} />
        ))}
      </Comment.Group>
      <div id="footer"></div>
    </>
  );
};

export default CommentPage;
