import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from 'contextAPI';
import { LIKE_POST } from 'schemas';

const LikeButton = ({ post: { postId, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    likes.findIndex((like) => like.author === authUser.id) !== -1
      ? setLiked(true)
      : setLiked(false);
  }, [likeCount]);

  const [likePost] = useMutation(LIKE_POST, { variables: { postId } });

  return (
    <Button as="div" labelPosition="right" onClick={() => likePost()}>
      <Button basic={liked ? false : true} color="blue">
        <Icon name="heart" />
      </Button>
      <Label as="a" basic pointing="left" color="blue">
        {likeCount}
      </Label>
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
