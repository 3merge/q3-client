import React from 'react';
import PropTypes from 'prop-types';
import MuiAvatar from '@material-ui/core/Avatar';
import useStyle from './styles';

export const getFirstLetter = (s) =>
  ['string', 'number'].includes(typeof s)
    ? String(s).charAt(0)
    : '';

const Avatar = (props) => {
  const { alt, icon, src } = props;

  return icon ? (
    <MuiAvatar
      aria-hidden
      classes={useStyle(props)}
      variant="rounded"
    >
      {icon}
    </MuiAvatar>
  ) : (
    <MuiAvatar
      alt={String(alt)}
      classes={useStyle(props)}
      src={src}
      variant="rounded"
    >
      {src ? null : getFirstLetter(alt)}
    </MuiAvatar>
  );
};

Avatar.defaultProps = {
  icon: null,
  src: undefined,
};

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  src: PropTypes.string,
};

export default Avatar;
