import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import SearchWithNgramAuth from '../SearchWithNgramAuth';
import ToolbarCollectionPortal from '../ToolbarCollectionPortal';
import Breadcrumbs from '../Breadcrumbs';

const ToolbarCollection = ({ children }) => (
  <ToolbarCollectionPortal>
    <Box display="flex" justifyContent="space-between">
      <Breadcrumbs />
      <Box display="flex" justifyContent="space-between">
        <SearchWithNgramAuth />
        {children}
      </Box>
    </Box>
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
