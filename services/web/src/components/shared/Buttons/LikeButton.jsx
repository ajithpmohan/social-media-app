import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from 'semantic-ui-react';

import { AuthCtx } from 'contextAPI';

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      likeCount
      likes {
        author
      }
    }
  }
`;

const LikeButton = ({ post: { postId, likes, likeCount } }) => {
  const [state, setState] = useState({ likes, likeCount, liked: false });
  const { authUser } = useContext(AuthCtx);

  useEffect(() => {
    state.likes.findIndex((like) => like.author === authUser.id) !== -1
      ? setState({ ...state, liked: true })
      : setState({ ...state, liked: false });
  }, [state.likeCount]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId },
    onCompleted({ likePost: { likes, likeCount } }) {
      setState({ ...state, likes, likeCount });
    },
  });

  return (
    <Button as="div" labelPosition="right" onClick={() => likePost()}>
      <Button color="linkedin">
        {state.liked ? <Icon name="like" color="red" /> : <Icon name="like" />}
        {state.likeCount}
      </Button>
    </Button>
  );
};

LikeButton.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string,
    likes: PropTypes.array,
    likeCount: PropTypes.number,
  }),
};

export default LikeButton;
