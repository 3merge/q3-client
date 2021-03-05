import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useMatch } from '@reach/router';
import { isObject, size, some } from 'lodash';
import { compose } from 'lodash/fp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigationLink from '../NavigationLink';

export const isNotEmpty = (xs) => size(xs) > 0;

export const getRelativePath = (xs) =>
  isObject(xs) && xs.to ? `${xs.to}/*` : '/';

const NavigationLinkWrapper = ({
  children,
  childrenItems,
  ...props
}) => {
  const checkActiveState = compose(
    isObject,
    useMatch,
    getRelativePath,
  );

  const includesPartiallyCurrent = some(
    childrenItems,
    checkActiveState,
  );

  return (
    <Box component="li">
      <NavigationLink
        includesPartiallyCurrent={includesPartiallyCurrent}
        {...props}
      >
        {isNotEmpty(childrenItems) && <ExpandMoreIcon />}
      </NavigationLink>
      {children}
    </Box>
  );
};

NavigationLinkWrapper.defaultProps = {
  children: null,
  childrenItems: [],
};

NavigationLinkWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
  childrenItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
};

export default NavigationLinkWrapper;
