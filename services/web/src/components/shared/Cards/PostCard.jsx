import React from 'react';
import PropTypes from 'prop-types';

import { Feed } from 'semantic-ui-react';

import { CommentButton } from 'components/shared/Buttons';
import { LikeButton } from 'components/shared/Buttons';
import { CommentForm } from 'components/shared/Forms';

const PostCard = ({ post, modal = true }) => {
  const {
    id: postId,
    body,
    author: { name },
    likes,
    likeCount,
    commentCount,
  } = post;

  return (
    <Feed.Event>
      <Feed.Label>
        <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary
          date="2 Days Ago"
          user={name}
          content="posted on his page"
        />
        <Feed.Extra text size="huge">
          {body}
        </Feed.Extra>
        <Feed.Meta>
          <LikeButton key={postId} post={{ postId, likes, likeCount }} />
          {modal ? (
            <CommentForm post={post} commentCount={commentCount} />
          ) : (
            <CommentButton commentCount={commentCount} />
          )}
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    commentCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.object),
  }),
  modal: PropTypes.bool,
};

export default PostCard;
