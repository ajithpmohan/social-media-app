import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import ReactTimeAgo from 'react-time-ago';
import { Button, Feed, Form, Modal } from 'semantic-ui-react';

import { CommentButton, LikeButton } from 'components/shared/Buttons';
import { CREATE_COMMENT, LIKE_POST, Fragment } from 'schemas';

const CommentForm = ({ post }) => {
  const { id: postId, likes, likeCount, commentCount } = post;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data: { comment } }) {
      const postFragment = cache.readFragment({
        id: `Post:${postId}`,
        fragment: Fragment.feed.comments,
      });

      if (postFragment) {
        // Update comments array of post whenever new comment is created.
        cache.writeFragment({
          id: `Post:${postId}`,
          fragment: Fragment.feed.comments,
          data: {
            comments: [...postFragment.comments, comment],
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
    createComment({ variables: { postId, body: text } });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const disabled = text === '';

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
      <Modal.Header>Feed</Modal.Header>
      <Modal.Content scrolling>
        <Feed size="large">
          <Feed.Event>
            <Feed.Label>
              <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{post.author.name}</Feed.User> @
                {post.author.username}
                <Feed.Date>
                  <ReactTimeAgo
                    date={new Date(+post.createdAt)}
                    locale="en-US"
                  />
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text size="huge">
                {post.body}
              </Feed.Extra>
              <Feed.Meta>
                <LikeButton
                  key={postId}
                  feed={{
                    feedId: postId,
                    likes,
                    likeCount,
                    likeMutation: LIKE_POST,
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
              disabled={disabled}
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

CommentForm.propTypes = {
  post: PropTypes.shape({
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
};

export default CommentForm;
