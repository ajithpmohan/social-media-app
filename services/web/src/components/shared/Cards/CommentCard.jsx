import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { Comment, Divider } from 'semantic-ui-react';

import { LikeButton } from 'components/shared/Buttons';
import { ReplyForm } from 'components/shared/Forms';
import { LIKE_COMMENT } from 'schemas';

const CommentCard = ({ comment, postId, threaded = false }) => {
  const {
    id: commentId,
    author: { name, username },
    body,
    createdAt,
    likes,
    likeCount,
  } = comment;

  const history = useHistory();

  return (
    <>
      <Comment className="feed-event">
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
        <Comment.Content onClick={() => history.push(`/comment/${commentId}`)}>
          <Comment.Author as="a">{name}</Comment.Author> @{username}
          <Comment.Metadata>
            <ReactTimeAgo date={new Date(+createdAt)} locale="en-US" />
          </Comment.Metadata>
          <Comment.Text>{body}</Comment.Text>
          <Comment.Actions>
            <LikeButton
              key={commentId}
              feed={{
                feedId: commentId,
                likes,
                likeCount,
                likeMutation: LIKE_COMMENT,
              }}
            />
            <ReplyForm comment={comment} postId={postId} />
          </Comment.Actions>
        </Comment.Content>
        {threaded && <Comment.Group />}
      </Comment>
      <Divider />
    </>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  postId: PropTypes.string.isRequired,
  threaded: PropTypes.bool,
};

export default CommentCard;
