import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { Feed } from 'semantic-ui-react';

import { LikeButton } from 'components/shared/Buttons';
import { CommentForm } from 'components/shared/Forms';

const PostCard = ({ post }) => {
  const history = useHistory();
  const { id: postId, likes, likeCount, __typename: feedType } = post;

  return (
    <>
      <Feed.Event className="feed-event">
        <Feed.Label as={Link} to={`/post/${postId}`}>
          <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
        </Feed.Label>
        <Feed.Content onClick={() => history.push(`/post/${postId}`)}>
          <Feed.Summary>
            <Feed.User>{post.author.name}</Feed.User> @{post.author.username}
            <Feed.Date>
              <Moment date={+post.createdAt} fromNow />
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
                feedType,
                likes,
                likeCount,
              }}
            />
            <CommentForm feed={post} />
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </>
  );
};

PostCard.propTypes = {
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
    __typename: PropTypes.string.isRequired,
  }),
};

export default PostCard;
