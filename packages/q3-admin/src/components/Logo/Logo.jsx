import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import useStyle from './styles';

const Logo = ({ src }) => (
  <Avatar
    variant="square"
    alt="Logo"
    src={src}
    classes={useStyle()}
  />
);

Logo.defaultProps = {
  src: '',
};

Logo.propTypes = {
  src: PropTypes.string,
};

export default Logo;
