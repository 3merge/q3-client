import React from 'react';
import Box from '@material-ui/core/Box';
import TableActions from '../TableActions';
import CollectionName from '../../components/CollectionName';
import Header from '../../components/Header';

// eslint-disable-next-line
const CollectionHeader = ({ children, ...props }) => (
  <Header>
    <Box alignItems="center" display="flex" width="100%">
      <CollectionName />
      <TableActions {...props} />
    </Box>
    {children}
  </Header>
);

export default CollectionHeader;
