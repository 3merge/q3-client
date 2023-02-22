import React from 'react';
import { Divider } from '@material-ui/core';
import useStyle from './styles';

const ToolbarDivider = () => (
  <Divider
    className={useStyle().divider}
    flexItem
    orientation="vertical"
  />
);

export default ToolbarDivider;
