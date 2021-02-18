import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/client';
import { Button, Feed, Form, Modal } from 'semantic-ui-react';

import { CommentButton } from 'components/shared/Buttons';
import { PostCard } from 'components/shared/Cards';
import { GET_POSTS, CREATE_COMMENT } from 'schemas';

const CommentForm = ({ post, commentCount }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data }) {
      const newPost = data?.createComment.post;
      const { getPosts: posts } = cache.readQuery({ query: GET_POSTS });
      const updatedPosts = posts.map((post) =>
        post.id === newPost.id ? newPost : post,
      );
      cache.writeQuery({ query: GET_POSTS, data: { getPosts: updatedPosts } });
    },
    onCompleted(data) {
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
    createComment({
      variables: { postId: post.id, body: text },
    });
  };

  return (
    <>
      {post && (
        <Modal
          size="tiny"
          open={open}
          onClose={() => {
            setErrors({});
            setOpen(false);
          }}
          onOpen={() => setOpen(true)}
          trigger={
            <CommentButton
              commentCount={commentCount}
              handleClick={() => setOpen(true)}
            />
          }
        >
          <Modal.Header>Feed</Modal.Header>
          <Modal.Content scrolling>
            <Feed size="large">
              <PostCard key={post.id} post={post} modal={false} />
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
      )}
    </>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  commentCount: PropTypes.number.isRequired,
};

export default CommentForm;
