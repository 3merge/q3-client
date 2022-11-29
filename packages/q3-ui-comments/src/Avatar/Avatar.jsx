import React from 'react';
import PropTypes from 'prop-types';
import Q3Avatar from 'q3-ui/lib/avatar';
import { string } from 'q3-ui-helpers';

export const { makeName } = string;

const Avatar = ({ photo, ...props }) => (
  <Q3Avatar imgSrc={photo} word={makeName(props)} />
);

Avatar.defaultProps = {
  photo: null,
};

Avatar.propTypes = {
  photo: PropTypes.string,
};

export default Avatar;
