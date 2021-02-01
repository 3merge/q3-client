import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import AppBar from '../AppBar';
import SideBar from '../SideBar';
import SideRail from '../SideRail';

const APP_BAR = 'AppBar';
const SIDE_BAR = 'SideBar';
const SIDE_RAIL = 'SideRail';

const Navigation = ({ variant, ...rest }) =>
  React.createElement(
    get(
      {
        [APP_BAR]: AppBar,
        [SIDE_BAR]: SideBar,
        [SIDE_RAIL]: SideRail,
      },
      variant,
      'nav',
    ),
    rest,
  );

Navigation.defaultProps = {
  variant: APP_BAR,
};

Navigation.propTypes = {
  variant: PropTypes.oneOf([APP_BAR, SIDE_BAR, SIDE_RAIL]),
};

export default Navigation;
