import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Button, Icon } from 'semantic-ui-react';

import { AuthContext } from 'contextAPI';
import { GET_POSTS, LIKE_POST } from 'schemas';

const LikeButton = ({ post: { postId, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    likes.findIndex((like) => like.author === authUser.id) !== -1
      ? setLiked(true)
      : setLiked(false);
  }, [likeCount]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId },
    update(cache, { data }) {
      const newPost = data?.likePost;
      const { getPosts: posts } = cache.readQuery({ query: GET_POSTS });
      const updatedPosts = posts.map((post) =>
        post.id === newPost.id ? newPost : post,
      );
      cache.writeQuery({ query: GET_POSTS, data: { getPosts: updatedPosts } });
    },
  });

  return (
    <Button as="div" labelPosition="right" onClick={() => likePost()}>
      <Button color="linkedin">
        {liked ? <Icon name="like" color="red" /> : <Icon name="like" />}
        {likeCount}
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
