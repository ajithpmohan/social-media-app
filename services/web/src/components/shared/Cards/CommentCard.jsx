import React from 'react';
import PropTypes from 'prop-types';

import ReactTimeAgo from 'react-time-ago';
import { Comment, Divider } from 'semantic-ui-react';

const CommentCard = ({
  comment: {
    author: { name, username },
    body,
    createdAt,
    replyCount,
  },
}) => {
  return (
    <>
      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
        <Comment.Content>
          <Comment.Author as="a">{name}</Comment.Author> @{username}
          <Comment.Metadata>
            <ReactTimeAgo date={new Date(+createdAt)} locale="en-US" />
          </Comment.Metadata>
          <Comment.Text>{body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
      <Divider />
    </>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    replyCount: PropTypes.number.isRequired,
  }),
};

export default CommentCard;
