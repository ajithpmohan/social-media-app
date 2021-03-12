import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { Comment, Divider } from 'semantic-ui-react';

import { LikeButton } from 'components/shared/Buttons';
import { ReplyForm } from 'components/shared/Forms';

const CommentCard = ({ comment, postId, threaded = false }) => {
  const {
    id: commentId,
    author: { name, username },
    body,
    createdAt,
    likes,
    likeCount,
    __typename: feedType,
  } = comment;

  const history = useHistory();

  return (
    <>
      <Comment className="feed-event">
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
        <Comment.Content onClick={() => history.push(`/comment/${commentId}`)}>
          <Comment.Author as="a">{name}</Comment.Author> @{username}
          <Comment.Metadata>
            <Moment date={+createdAt} fromNow />
          </Comment.Metadata>
          <Comment.Text>{body}</Comment.Text>
          <Comment.Actions>
            <LikeButton
              key={commentId}
              feed={{
                feedId: commentId,
                feedType,
                likes,
                likeCount,
              }}
            />
            <ReplyForm feed={comment} parent={postId} />
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
    __typename: PropTypes.string.isRequired,
  }),
  postId: PropTypes.string.isRequired,
  threaded: PropTypes.bool,
};

export default CommentCard;
