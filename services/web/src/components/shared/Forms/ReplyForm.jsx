import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import ReactTimeAgo from 'react-time-ago';
import { Button, Feed, Form, Modal } from 'semantic-ui-react';

import { CommentButton, LikeButton } from 'components/shared/Buttons';
import { CREATE_COMMENT, LIKE_COMMENT, Fragment } from 'schemas';

const ReplyForm = ({ comment, postId }) => {
  const { id: commentId, likes, likeCount, commentCount } = comment;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data: { comment } }) {
      const commentFragment = cache.readFragment({
        id: `Comment:${commentId}`,
        fragment: Fragment.feed.replies,
      });

      if (commentFragment) {
        // Update replies array of comment whenever new reply is created.
        cache.writeFragment({
          id: `Comment:${commentId}`,
          fragment: Fragment.feed.replies,
          data: {
            replies: [...commentFragment.replies, comment],
          },
        });
      }
    },
    onCompleted() {
      setText('');
      setOpen(false);
    },
    onError(err) {
      if (err.graphQLErrors.length) {
        setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    createComment({ variables: { postId, commentId, body: text } });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <Modal
      size="tiny"
      open={open}
      onClose={() => {
        setErrors({});
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      trigger={
        <CommentButton commentCount={commentCount} handleClick={handleClick} />
      }
      onClick={(e) => e.stopPropagation()}
    >
      <Modal.Header>Comment</Modal.Header>
      <Modal.Content scrolling>
        <Feed size="large">
          <Feed.Event>
            <Feed.Label>
              <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{comment.author.name}</Feed.User> @
                {comment.author.username}
                <Feed.Date>
                  <ReactTimeAgo
                    date={new Date(+comment.createdAt)}
                    locale="en-US"
                  />
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text size="huge">
                {comment.body}
              </Feed.Extra>
              <Feed.Meta>
                <LikeButton
                  key={comment}
                  feed={{
                    feedId: commentId,
                    likes,
                    likeCount,
                    likeMutation: LIKE_COMMENT,
                  }}
                />
                <CommentButton commentCount={commentCount} />
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Modal.Description>
          <Form reply size="huge" onSubmit={handleSubmit}>
            <Form.TextArea
              value={text}
              onChange={({ target: { value } }) => setText(value)}
              error={errors?.body ? true : false}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

ReplyForm.propTypes = {
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
    commentCount: PropTypes.number.isRequired,
  }),
  postId: PropTypes.string.isRequired,
};

export default ReplyForm;
