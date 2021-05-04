import React from 'react';
import PropTypes from 'prop-types';
import Q3Avatar from 'q3-ui/lib/avatar';
import { compact } from 'lodash';

export const makeName = (xs) =>
  compact([xs?.firstName, xs?.lastName]).join(' ') ||
  'Anonymous';

const Avatar = ({ photo, ...props }) => (
  <Q3Avatar imgSrc={photo} word={makeName(props)} />
);

Avatar.propTypes = {
  photo: PropTypes.string.isRequired,
};

export default Avatar;
