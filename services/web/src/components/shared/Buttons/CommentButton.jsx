import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const CommentButton = ({ commentCount, handleClick }) => (
  <Button as="div" labelPosition="right" onClick={handleClick}>
    <Button color="linkedin">
      <Icon name="comment" />
      {commentCount}
    </Button>
  </Button>
);

CommentButton.propTypes = {
  commentCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
};

export default CommentButton;
