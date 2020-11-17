import React from 'react';
import {
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

export default (toggle) => (
  <Input
    onClick={toggle}
    startAdornment={
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    }
  />
);

/**

  <IconButton onClick={toggle}>
    <Search />
  </IconButton>
 */
