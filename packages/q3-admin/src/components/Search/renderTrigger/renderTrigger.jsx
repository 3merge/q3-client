import React from 'react';
import { IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';

export default (toggle) => (
  <IconButton onClick={toggle}>
    <Search />
  </IconButton>
);
