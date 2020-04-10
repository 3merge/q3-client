import React from 'react';
import PropTypes from 'prop-types';
import { withLocation } from 'with-location';
import DesktopSearch from './desktopSearch';
import MobileSearch from './mobileSearch';

const Searchbar = ({ getFrom, ...rest }) =>
  [DesktopSearch, MobileSearch].map((El) =>
    React.createElement(El, {
      initialValue: getFrom('search') || '',
      ...rest,
    }),
  );

Searchbar.propTypes = {
  getFrom: PropTypes.func.isRequired,
};

Searchbar.defaultProps = {
  redirectPath: '',
};

export default withLocation(Searchbar);
