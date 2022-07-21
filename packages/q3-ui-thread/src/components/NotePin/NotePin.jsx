import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Context from '../ThreadContext';
import usePin from '../usePin';

const NotePin = ({ id, pin }) => {
  const { canPin } = React.useContext(Context);
  const { isPinned, toggle } = usePin(id, pin);

  return canPin ? (
    <IconButton
      className="q3-thread-pin"
      color="inherit"
      data-pinned={isPinned}
      data-pinned-for={id}
      onClick={toggle}
    >
      {isPinned ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
  ) : null;
};

NotePin.defaultProps = {
  pin: false,
};

NotePin.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  pin: PropTypes.bool,
};

export default NotePin;
