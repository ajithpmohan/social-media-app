import React from 'react';
import PropTypes from 'prop-types';

import { Fragment } from 'schemas';
import ModalForm from './ModalForm';

const CommentForm = ({ feed }) => {
  const { id: feedId } = feed;

  const updateFragment = ({ cache, comment }) => {
    const postFragment = cache.readFragment({
      id: `Post:${feedId}`,
      fragment: Fragment.feed.comments,
    });

    if (postFragment) {
      // Update comments array of post whenever new comment is created.
      cache.writeFragment({
        id: `Post:${feedId}`,
        fragment: Fragment.feed.comments,
        data: {
          comments: [comment, ...postFragment.comments],
        },
      });
    }
  };

  return <ModalForm feed={feed} updateFragment={updateFragment} />;
};

CommentForm.propTypes = {
  feed: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default CommentForm;
