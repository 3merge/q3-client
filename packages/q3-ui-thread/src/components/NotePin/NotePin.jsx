import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Context from '../ThreadContext';
import usePin from '../usePin';

const NotePin = ({ id, pin }) => {
  const { isPinned, toggle } = usePin(id, pin);
  const { canEdit, canPin } = React.useContext(Context);

  return (
    canPin && (
      <IconButton
        disabled={!canEdit}
        color="inherit"
        onClick={toggle}
      >
        {isPinned ? (
          <BookmarkIcon />
        ) : (
          <BookmarkBorderIcon />
        )}
      </IconButton>
    )
  );
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
