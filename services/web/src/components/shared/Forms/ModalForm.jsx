import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import ReactTimeAgo from 'react-time-ago';
import { Button, Feed, Form, Modal } from 'semantic-ui-react';

import { CommentButton, LikeButton } from 'components/shared/Buttons';
import { CREATE_COMMENT } from 'schemas';

const ModalForm = ({
  feed: {
    id: feedId,
    body,
    author: { name, username },
    createdAt,
    likes,
    likeCount,
    commentCount,
    __typename: feedType,
  },
  parent,
  updateFragment,
}) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const [createComment] = useMutation(CREATE_COMMENT, {
    update: (cache, { data: { comment } }) =>
      updateFragment({ cache, comment }),
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
    feedType === 'Post' &&
      createComment({ variables: { postId: feedId, body: text } });
    feedType === 'Comment' &&
      createComment({
        variables: { postId: parent, commentId: feedId, body: text },
      });
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
      <Modal.Header>Feed</Modal.Header>
      <Modal.Content scrolling>
        <Feed size="large">
          <Feed.Event>
            <Feed.Label>
              <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{name}</Feed.User> @{username}
                <Feed.Date>
                  <ReactTimeAgo date={new Date(+createdAt)} locale="en-US" />
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text size="huge">
                {body}
              </Feed.Extra>
              <Feed.Meta>
                <LikeButton
                  key={feedId}
                  feed={{
                    feedId,
                    feedType,
                    likes,
                    likeCount,
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

ModalForm.propTypes = {
  feed: PropTypes.shape({
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
    __typename: PropTypes.string.isRequired,
  }),
  parent: PropTypes.string,
  updateFragment: PropTypes.func.isRequired,
};

export default ModalForm;
