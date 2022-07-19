import React from 'react';
import PropTypes from 'prop-types';
import { Chip, CardActions } from '@material-ui/core';
import { map } from 'lodash';
import useStyle from './styles';
import ThreadContext from '../ThreadContext';

const NoteTags = ({ tags, selectTag }) =>
  React.useContext(ThreadContext)?.canTag ? (
    <CardActions classes={useStyle()}>
      {map(tags, (tag) => (
        <Chip
          key={tag}
          label={tag}
          onClick={() => selectTag(tag)}
          size="small"
        />
      ))}
    </CardActions>
  ) : null;

NoteTags.defaultProps = {
  tags: [],
};

NoteTags.propTypes = {
  selectTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default NoteTags;
