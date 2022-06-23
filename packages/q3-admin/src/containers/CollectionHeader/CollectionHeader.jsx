import React from 'react';
import { Box } from '@material-ui/core';
import TableActions from '../TableActions';
import CollectionName from '../../components/CollectionName';
import Header from '../../components/Header';

const CollectionHeader = (props) => (
  <Header>
    <CollectionName />
    <TableActions {...props} />
  </Header>
);

export default CollectionHeader;
