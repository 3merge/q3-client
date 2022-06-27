import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import SearchWithNgramAuth from '../SearchWithNgramAuth';
import ToolbarCollectionPortal from '../ToolbarCollectionPortal';
import Breadcrumbs from '../Breadcrumbs';

const ToolbarCollection = ({ children }) => (
  <ToolbarCollectionPortal>
    <Hidden mdDown>
      <Breadcrumbs />
      <Box flex="1" />
    </Hidden>
    <SearchWithNgramAuth />
    {children}
  </ToolbarCollectionPortal>
);

ToolbarCollection.defaultProps = {
  children: null,
};

ToolbarCollection.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.func,
  ]),
};

export default ToolbarCollection;
