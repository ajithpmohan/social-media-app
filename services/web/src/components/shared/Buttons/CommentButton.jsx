import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Label } from 'semantic-ui-react';

const CommentButton = ({ commentCount, handleClick }) => (
  <Button as="div" labelPosition="right" onClick={handleClick}>
    <Button basic color="blue">
      <Icon name="comment" />
    </Button>
    <Label as="a" basic pointing="left" color="blue">
      {commentCount}
    </Label>
  </Button>
);

CommentButton.propTypes = {
  commentCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
};

export default CommentButton;
