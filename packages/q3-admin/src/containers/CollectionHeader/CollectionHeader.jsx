import React from 'react';
import Box from '@material-ui/core/Box';
import TableActions from '../TableActions';
import CollectionName from '../../components/CollectionName';
import Header from '../../components/Header';

// eslint-disable-next-line
const CollectionHeader = ({ children, ...props }) => (
  <Header>
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
    >
      <Box flex="1">
        <CollectionName />
      </Box>
      <TableActions {...props} />
    </Box>
    {children}
  </Header>
);

export default CollectionHeader;
