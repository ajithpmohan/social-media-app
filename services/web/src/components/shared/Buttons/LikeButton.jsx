import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from 'contextAPI';
import { LIKE_POST, LIKE_COMMENT } from 'schemas';

const LikeButton = ({ feed: { feedId, feedType, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  const { authUser } = useContext(AuthContext);

  const likeMutation = feedType === 'Post' ? LIKE_POST : LIKE_COMMENT;

  useEffect(() => {
    likes.findIndex((like) => like.author === authUser.id) !== -1
      ? setLiked(true)
      : setLiked(false);
  }, [likeCount]);

  const [likeFeed] = useMutation(likeMutation, {
    variables: { feedId },
  });

  const handleLike = (e) => {
    e.stopPropagation();
    likeFeed();
  };
  return (
    <Button as="div" labelPosition="right" onClick={handleLike}>
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
  feed: PropTypes.shape({
    feedId: PropTypes.string,
    feedType: PropTypes.string.isRequired,
    likes: PropTypes.array,
    likeCount: PropTypes.number,
  }),
};

export default LikeButton;
