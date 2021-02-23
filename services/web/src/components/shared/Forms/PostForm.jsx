import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { GET_POSTS, CREATE_POST } from 'schemas';

const PostForm = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data }) {
      const newPost = data?.createPost;
      const existingPosts = cache.readQuery({ query: GET_POSTS });

      cache.writeQuery({
        query: GET_POSTS,
        data: {
          getPosts: [newPost, ...existingPosts?.getPosts],
        },
      });
    },
    onCompleted() {
      setText('');
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
    createPost({ variables: { body: text } });
  };

  return (
    <>
      <Header as="h3">Create a Post</Header>
      <Form size="huge" onSubmit={handleSubmit}>
        <Form.TextArea
          placeholder="What's Happening"
          value={text}
          onChange={({ target: { value } }) => setText(value)}
          error={errors?.body ? true : false}
        />
        <Button content="Post" labelPosition="left" icon="feed" primary />
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
    </>
  );
};

export default PostForm;
