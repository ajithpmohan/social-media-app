import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { Feed, Divider } from 'semantic-ui-react';

import { LikeButton } from 'components/shared/Buttons';
import { CommentForm } from 'components/shared/Forms';
import * as ROUTES from 'constants/routes';

const PostCard = ({ post }) => {
  const history = useHistory();
  const {
    id: postId,
    body,
    author: { name, username },
    createdAt,
    likes,
    likeCount,
  } = post;
  return (
    <>
      <Feed.Event>
        <Feed.Label as={Link} to={`${ROUTES.TIMELINE}/${postId}`}>
          <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
        </Feed.Label>
        <Feed.Content
          onClick={() => history.push(`${ROUTES.TIMELINE}/${postId}`)}
        >
          <Feed.Summary>
            <Feed.User>{name}</Feed.User> @{username}
            <Feed.Date>
              <ReactTimeAgo date={new Date(+createdAt)} locale="en-US" />
            </Feed.Date>
          </Feed.Summary>
          <Feed.Extra text size="huge">
            {body}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
      <Feed.Meta className="feed">
        <LikeButton key={postId} post={{ postId, likes, likeCount }} />
        <CommentForm post={post} />
      </Feed.Meta>
      <Divider />
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
    likes: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PostCard;
