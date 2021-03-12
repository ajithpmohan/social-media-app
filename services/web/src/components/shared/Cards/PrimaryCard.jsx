import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Feed, Divider } from 'semantic-ui-react';
import Moment from 'react-moment';

import { LikeButton } from 'components/shared/Buttons';
import { CommentForm, ReplyForm } from 'components/shared/Forms';

const PrimaryCard = ({ feed, parent }) => {
  const {
    id: feedId,
    body,
    author: { name, username },
    createdAt,
    likes,
    likeCount,
    __typename: feedType,
  } = feed;

  const scrollToContainer = useRef(null);

  useEffect(() => {
    if (scrollToContainer.current) {
      scrollToContainer.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'start',
      });
    }
  }, []);

  return (
    <div ref={scrollToContainer}>
      <Feed size="large" className="primary-feed">
        <Feed.Event className="profile">
          <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{name}</Feed.User>
            </Feed.Summary>
            <Feed.Summary>
              <Feed.Meta>@{username}</Feed.Meta>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event className="body">
          <Feed.Content>
            <Feed.Extra text>{body}</Feed.Extra>
            <Feed.Extra text>
              <Feed.Date>
                <Moment date={+createdAt} format="h:mm A . MMM DD, YYYY" />
              </Feed.Date>
            </Feed.Extra>
            <Divider />
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
              {feed.__typename === 'Post' && <CommentForm feed={feed} />}
              {feed.__typename === 'Comment' && (
                <ReplyForm feed={feed} parent={parent} />
              )}
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        <Divider />
      </Feed>
    </div>
  );
};

PrimaryCard.propTypes = {
  feed: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  parent: PropTypes.string,
};

export default PrimaryCard;
