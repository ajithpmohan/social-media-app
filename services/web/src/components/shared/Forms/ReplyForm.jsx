import React from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'schemas';
import ModalForm from './ModalForm';

const ReplyForm = ({ feed, parent }) => {
  const { id: feedId } = feed;

  const updateFragment = ({ cache, comment }) => {
    const commentFragment = cache.readFragment({
      id: `Comment:${feedId}`,
      fragment: Fragment.feed.replies,
    });

    if (commentFragment) {
      // Update replies array of comment whenever new reply is created.
      cache.writeFragment({
        id: `Comment:${feedId}`,
        fragment: Fragment.feed.replies,
        data: {
          replies: [comment, ...commentFragment.replies],
        },
      });
    }
  };

  return (
    <ModalForm feed={feed} parent={parent} updateFragment={updateFragment} />
  );
};

ReplyForm.propTypes = {
  feed: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  parent: PropTypes.string.isRequired,
};

export default ReplyForm;
