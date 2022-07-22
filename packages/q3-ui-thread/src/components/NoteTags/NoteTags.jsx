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
          className="q3-thread-tag"
          color="secondary"
          key={tag}
          label={tag}
          onClick={() => selectTag(String(tag))}
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
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
};

export default NoteTags;
